import { parseInt } from '../source/string/parseInt';
import { map } from '../source/collection/map';

describe('parseInt', () => {
    test('parseInt("08") => 8', () => {
        expect(parseInt('08')).toBe(8);
    });

    test('map(["6", "08", "10"], parseInt) => [6, 8, 10]', () => {
        expect(map(['6', '08', '10'], parseInt)).toEqual([6, 8, 10]);
    });
});
