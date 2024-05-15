import { HRDate } from './hr-date/hr-date.js';

/**
 * Generates an array of monthly payment and bonus dates for the given year
 * @param {'en-US'|'nl-BE'|'fr-BE'|'de-BE'} locale
 * @param {number} bonusDate
 * @returns {{
 *   month: string,
 *   paymentDay: string,
 *   bonusDay: string
 * }[]} The payment and bonus dates
 */
export function calculatePaymentDatesUntilEndYear(
	locale = 'en-US',
	bonusDate = 15,
) {
	const currentYear = new Date().getFullYear();
	const paymentDates = [];
	for (let month = new Date().getMonth(); month < 12; month++) {
		paymentDates.push(
			getPaymentDatesForMonth({
				year: currentYear,
				month,
				locale,
				bonusDate,
			}),
		);
	}
	return paymentDates;
}

/**
 * Calculates the payment and bonus dates for a given month
 * @param {object} options
 * @param {number} options.year
 * @param {number} options.month
 * @param {number} [options.bonusDate=15] The bonus date
 * @param {string} [options.locale='en-US'] The locale to use
 * @returns {{
 * 		month: string,
 * 		paymentDay: string,
 * 		bonusDay: string
 * }} The payment and bonus dates
 * @throws {Error} If the year or month is invalid
 * @example
 * const dates = getPaymentDatesForMonth({ year: 2021, month: 0 });
 * console.log(dates);
 * // {
 * //   month: 'January',
 * //   paymentDay: '2021-01-29',
 * //   bonusDay: '2021-01-15'
 * // }
 */
export function getPaymentDatesForMonth({
	year,
	month,
	bonusDate = 15,
	locale = 'en-US',
} = {}) {
	if (year === undefined) {
		throw new Error('Invalid year');
	}
	if (month === undefined) {
		throw new Error('Invalid month');
	}
	const paymentDay = getLastWorkingDayOfMonth({ year, month });

	const bonusDay = getBonusDay({ year, month, bonusDate });

	return {
		month: new Date(year, month).toLocaleDateString(locale, {
			month: 'long',
			year: 'numeric',
		}),
		paymentDay: paymentDay.date.toLocaleDateString(locale, {
			day: 'numeric',
			weekday: 'long',
		}),
		bonusDay: bonusDay.date.toLocaleDateString(locale, {
			day: 'numeric',
			weekday: 'long',
		}),
	};
}

/**
 * Calculates the last working day of the month
 * @param {HRDate} date
 * @returns {HRDate} The last working day of the month
 * @throws {Error} If the year or month is invalid
 * @example
 * const lastWorkingDay = getLastWorkingDayOfMonth({ year: 2021, month: 0 });
 * console.log(lastWorkingDay); // { year: 2021, month: 0, day: 29 }
 */
export function getLastWorkingDayOfMonth({ year, month }) {
	const lastDay = getLastDayOfMonth({ year, month });
	if (HRDate.isWeekend(lastDay.date)) {
		return HRDate.getPreviousWorkingDay(lastDay.date);
	}
	return lastDay;
}

/**
 * Calculates the last day of the month
 * @param {HRDate} date
 * @returns {HRDate}
 * @throws {Error} If the year or month is invalid
 * @example
 * const lastDay = getLastDayOfMonth({ year: 2021, month: 0 });
 * console.log(lastDay); // { year: 2021, month: 0, day: 31 }
 */
export function getLastDayOfMonth({ year, month }) {
	const lastDay = new HRDate({ year, month });
	lastDay.date.setMonth(lastDay.date.getMonth() + 1);
	lastDay.date.setDate(0);
	return lastDay;
}

function getBonusDay({ year, month, bonusDate }) {
	const bonusDay = new HRDate({ year, month, day: bonusDate });
	if (HRDate.isWeekend(bonusDay.date)) {
		return HRDate.getNextDayOfWeek(bonusDay.date, 3);
	}
	return bonusDay;
}
