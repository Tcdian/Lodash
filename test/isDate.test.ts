import { isDate } from '../source/lang/isDate';

describe('isDate', () => {
    test('isDate(new Date) => true', () => {
        expect(isDate(new Date())).toBe(true);
    });

    test('isDate("Mon April 23 2012") => false', () => {
        expect(isDate('Mon April 23 2012')).toBe(false);
    });
});
