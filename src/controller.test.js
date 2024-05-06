import {
	calculatePaymentDatesUntilEndYear,
	getPaymentDatesForMonth,
	getLastDayOfMonth,
	getLastWorkingDayOfMonth,
} from './controller';

describe('controller', () => {
	describe('calculatePaymentDatesUntilEndYear', () => {
		it('should return the payment dates for the rest of the year', () => {
			const paymentDates = calculatePaymentDatesUntilEndYear();
			expect(paymentDates).toHaveLength(12 - new Date().getMonth());
			expect(paymentDates[0].month).toEqual('May 2024');
		});
	});

	describe('getPaymentDatesForMonth', () => {
		it('should return the payment and bonus dates for January 2021', () => {
			const dates = getPaymentDatesForMonth({ year: 2021, month: 0 });
			expect(dates).toEqual({
				month: 'January 2021',
				paymentDay: '29 Friday',
				bonusDay: '15 Friday',
			});
		});

		it('should return the payment and bonus dates for December 2021', () => {
			const dates = getPaymentDatesForMonth({ year: 2021, month: 11 });
			expect(dates).toEqual({
				month: 'December 2021',
				paymentDay: '31 Friday',
				bonusDay: '15 Wednesday',
			});
		});

		it('should throw an error for an invalid year', () => {
            expect(() =>
                getPaymentDatesForMonth({ month: 0 }),
            ).toThrow(Error);
		});

		it('should throw an error for an invalid month', () => {
			
            expect(() =>
                getPaymentDatesForMonth({ year: 2021 }),
            ).toThrow(Error);
		});

		it('should throw an error if no params are passed', () => {
			expect(() => getPaymentDatesForMonth()).toThrow(Error);
		});
	});

    describe('getLastWorkingDayOfMonth', () => {
		it('should return the last working day of January 2021', () => {
			const year = 2021;
			const month = 0;
			const lastWorkingDay = getLastWorkingDayOfMonth({ year, month });
			expect(lastWorkingDay.toObject()).toEqual({ year: 2021, month: 0, day: 29 });
		});

		it('should return the last working day of February 2021', () => {
			const year = 2021;
			const month = 1;
			const lastWorkingDay = getLastWorkingDayOfMonth({ year, month });
			expect(lastWorkingDay.toObject()).toEqual({ year: 2021, month: 1, day: 26 });
		});

		it('should return the last working day of March 2021', () => {
			const year = 2021;
			const month = 2;
			const lastWorkingDay = getLastWorkingDayOfMonth({ year, month });
			expect(lastWorkingDay.toObject()).toEqual({ year: 2021, month: 2, day: 31 });
		});

		it('should throw an error for an invalid year', () => {
			expect(() => getLastWorkingDayOfMonth({ month: 0 })).toThrow(Error);
		});

		it('should throw an error for an invalid month', () => {
			expect(() => getLastWorkingDayOfMonth({ year: 2021 })).toThrow(
				Error,
			);
		});
	});

    describe('getLastDayOfMonth', () => {
		it('should return the last day of January 2021', () => {
			const year = 2021;
			const month = 0;
			const lastDay = getLastDayOfMonth({ year, month });
			expect(lastDay.toObject()).toEqual({ year: 2021, month: 0, day: 31 });
		});

		it('should return the last day of February 2021', () => {
			const year = 2021;
			const month = 1;
			const lastDay = getLastDayOfMonth({ year, month });
			expect(lastDay.toObject()).toEqual({ year: 2021, month: 1, day: 28 });
		});

		it('should throw an error for an invalid year', () => {
			expect(() => getLastDayOfMonth()).toThrow(Error);
		});

		it('should throw an error for an invalid month', () => {
			expect(() => getLastDayOfMonth({ year: 2021 })).toThrow(Error);
		});
	});



});
