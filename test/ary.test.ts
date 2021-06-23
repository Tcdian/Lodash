import { ary } from '../source/function/ary';
import { map } from '../source/collection/map';

describe('ary', () => {
    test('map(["6", "8", "10"], ary(parseInt, 1)) => [6, 8, 10]', () => {
        expect(map(['6', '8', '10'], ary(parseInt, 1))).toEqual([6, 8, 10]);
    });
});
