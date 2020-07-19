import { lowerFirst } from '../source/string/lowerFirst';

test(`lowerFirst('Fred') => ${lowerFirst('Fred')}`, () => {
    expect(lowerFirst('Fred')).toBe('fred');
});

test(`lowerFirst('FRED') => ${lowerFirst('FRED')}`, () => {
    expect(lowerFirst('FRED')).toBe('fRED');
});
