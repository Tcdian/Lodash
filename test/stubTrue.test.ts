import { stubTrue } from '../source/util/stubTrue';
import { times } from '../source/util/times';

describe('stubTrue', () => {
    test('times(2, stubTrue) => [true, true]', () => {
        expect(times(2, stubTrue)).toEqual([true, true]);
    });
});
