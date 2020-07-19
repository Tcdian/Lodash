import { isDate } from '../source/lang/isDate';

test(`isDate(new Date) => ${isDate(new Date())}`, () => {
    expect(isDate(new Date())).toBe(true);
});

test(`isDate('Mon April 23 2012') => ${isDate('Mon April 23 2012')}`, () => {
    expect(isDate('Mon April 23 2012')).toBe(false);
});
