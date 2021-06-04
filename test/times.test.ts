import { times } from '../source/util/times';
import { constant } from '../source/util/constant';

describe('times', () => {
    test('times(3, String) => ["0", "1", "2"]', () => {
        expect(times(3, String)).toEqual(['0', '1', '2']);
    });

    test('times(4, constant(0)) => [0, 0, 0, 0]', () => {
        expect(times(4, constant(0))).toEqual([0, 0, 0, 0]);
    });
});
