import { lowerFirst } from '../source/string/lowerFirst';

describe('lowerFirst', () => {
    test('lowerFirst("Fred") => "fred"', () => {
        expect(lowerFirst('Fred')).toBe('fred');
    });

    test('lowerFirst("FRED") => "fRED"', () => {
        expect(lowerFirst('FRED')).toBe('fRED');
    });
});
