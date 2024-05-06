import { HRDate } from './hr-date.js';

describe('hr-date', () => {
	describe('HRDate', () => {
		it('should return the year', () => {
			const date = new HRDate({ year: 2021, month: 0, day: 1 });
			expect(date.year).toBe(2021);
		});

		it('should return the month', () => {
			const date = new HRDate({ year: 2021, month: 0, day: 1 });
			expect(date.month).toBe(0);
		});

		it('should return the day', () => {
			const date = new HRDate({ year: 2021, month: 0, day: 1 });
			expect(date.day).toBe(1);
		});

		it('should return the day of the week', () => {
			const date = new HRDate({ year: 2021, month: 0, day: 1 });
			expect(date.dayOfWeek).toBe(5);
		});

		it('should return true if the date is a weekend', () => {
			const date = new Date(2021, 0, 1);
			expect(HRDate.isWeekend(date)).toBe(false);
		});
	});

	describe('HRDate getPreviousWorkingDay', () => {
		it('should return the previous working day', () => {
			const date = new Date(2021, 0, 3);
			const lastWorkingDay = HRDate.getPreviousWorkingDay(date);
			expect(lastWorkingDay.toObject()).toEqual({
				year: 2021,
				month: 0,
				day: 1,
			});
		});

		it('should throw an error for an invalid date', () => {
			expect(() => new HRDate('2021-01-01')).toThrow(Error);
		});

		it('should throw an error for an empty year is passed', () => {
			expect(() => new HRDate({ month: 0 })).toThrow(Error);
		});

		it('should throw an error for an empty month is passed', () => {
			expect(() => new HRDate({ year: 2021 })).toThrow(Error);
		});
	});

	describe('HRDate getNextDayOfWeek', () => {
		it('should return the next Monday', () => {
			const date = new Date(2021, 0, 1);
			const nextMonday = HRDate.getNextDayOfWeek(date, 1);
			expect(nextMonday.toObject()).toEqual({
				year: 2021,
				month: 0,
				day: 4,
			});
		});

		it('should return the next Saturday', () => {
			const date = new Date(2021, 0, 3);
			const nextSaturday = HRDate.getNextDayOfWeek(date, 6);
			expect(nextSaturday.toObject()).toEqual({
				year: 2021,
				month: 0,
				day: 9,
			});
		});

		it('should return the next Monday (same day of the week)', () => {
			const date = new Date(2021, 0, 4);
			const nextSunday = HRDate.getNextDayOfWeek(date, 1);
			expect(nextSunday.toObject()).toEqual({
				year: 2021,
				month: 0,
				day: 11,
			});
		});

		it('should throw an error for an invalid day of the week', () => {
			const date = new Date(2021, 0, 1);
			expect(() => HRDate.getNextDayOfWeek(date, 7)).toThrow(Error);
		});
	});
});
