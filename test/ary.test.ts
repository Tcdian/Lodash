import { ary } from '../source/function/ary';

describe('ary', () => {
    test('["6", "8", "10"].map(ary(parseInt, 1)) => [6, 8, 10]', () => {
        expect(['6', '8', '10'].map(ary(parseInt, 1))).toEqual([6, 8, 10]);
    });
});
