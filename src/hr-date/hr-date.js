export class HRDate {
	/**
	 * @typedef {object} HRDateParams
	 * @property {number} year The year
	 * @property {number} month The month
	 * @property {number} [day] The day
	 */

	/**
	 * Creates a new HRDate instance
	 * @param {HRDateParams} The date parameters
	 */
	constructor({ year, month, day }) {
		// console.log('year', year, 'month', month, 'day', day);
		if (year === undefined) {
			throw new Error('Invalid year');
		}
		if (month === undefined) {
			throw new Error('Invalid month');
		}
		this.date = new Date(year, month, day === undefined ? 1 : day);
	}

	/**
	 * Returns the year
	 * @returns {number} The year
	 */
	get year() {
		return this.date.getFullYear();
	}

	/**
	 * Returns the month
	 * @returns {number} The month
	 */
	get month() {
		return this.date.getMonth();
	}

	/**
	 * Returns the day
	 * @returns {number} The day
	 */
	get day() {
		return this.date.getDate();
	}

	/**
	 * Returns the day of the week
	 * @returns {number} The day of the week
	 */
	get dayOfWeek() {
		return this.date.getDay();
	}

	/**
	 * Converts the HRDate instance to an object
	 * @returns {{
	 *   year: number,
	 *   month: number,
	 *   day: number
	 * }} The date object
	 */
	toObject() {
		return {
			year: this.year,
			month: this.month,
			day: this.day,
		};
	}

	/**
	 * Returns true if the date is a weekend, false otherwise
	 * @param {Date} date
	 * @returns {boolean} True if the date is a weekend
	 */
	static isWeekend(date) {
		const dayOfWeek = date.getDay();
		return dayOfWeek === 0 || dayOfWeek === 6;
	}

	/**
	 * Creates a new HRDate instance from a Date instance
	 * @param {Date} date
	 * @returns {HRDate} A new HRDate instance
	 */
	static fromDate(date) {
		return new HRDate({
			year: date.getFullYear(),
			month: date.getMonth(),
			day: date.getDate(),
		});
	}

	/**
	 * Returns the last working day of the month
	 * @param {Date} date
	 * @returns {HRDate} The last working day
	 */
	static getPreviousWorkingDay(date) {
		const result = new Date(date);

		result.setDate(result.getDate() - 1);

		while (HRDate.isWeekend(result)) {
			result.setDate(result.getDate() - 1);
		}

		return HRDate.fromDate(result);
	}

	/**
	 * Returns the next day of the week
	 * @param {Date} date The date
	 * @param {number} dayOfWeek The day of the week
	 * @returns {HRDate} The next day of the week
	 */
	static getNextDayOfWeek(date, dayOfWeek) {
		if (dayOfWeek < 0 || dayOfWeek > 6) {
			throw new Error('Invalid day of week');
		}

		const result = new Date(date);
		const diff = dayOfWeek - result.getDay();

		if (diff <= 0) {
			result.setDate(result.getDate() + 7 + diff);
		} else {
			result.setDate(result.getDate() + diff);
		}

		return HRDate.fromDate(result);
	}
}
