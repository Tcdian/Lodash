import { upperFirst } from '../source/string/upperFirst';

describe('upperFirst', () => {
    test('upperFirst("fred") => "Fred"', () => {
        expect(upperFirst('fred')).toBe('Fred');
    });

    test('upperFirst("FRED") => "FRED"', () => {
        expect(upperFirst('FRED')).toBe('FRED');
    });
});
