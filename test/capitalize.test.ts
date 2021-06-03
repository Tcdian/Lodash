import { capitalize } from '../source/string/capitalize';

describe('capitalize', () => {
    test('capitalize("FRED") => "Fred"', () => {
        expect(capitalize('FRED')).toBe('Fred');
    });

    test('capitalize("Fred") => "Fred"', () => {
        expect(capitalize('Fred')).toBe('Fred');
    });
});
