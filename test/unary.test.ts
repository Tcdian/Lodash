import { unary } from '../source/function/unary';

describe('unary', () => {
    test('["6", "8", "10"].map(unary(parseInt, 1)) => [6, 8, 10]', () => {
        expect(['6', '8', '10'].map(unary(parseInt))).toEqual([6, 8, 10]);
    });
});
