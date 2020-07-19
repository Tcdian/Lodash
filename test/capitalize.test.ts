import { capitalize } from '../source/string/capitalize';

test(`capitalize('FRED') => ${capitalize('FRED')}`, () => {
    expect(capitalize('FRED')).toBe('Fred');
});

test(`capitalize('Fred') => ${capitalize('Fred')}`, () => {
    expect(capitalize('Fred')).toBe('Fred');
});
