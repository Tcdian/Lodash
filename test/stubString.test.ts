import { stubString } from '../source/util/stubString';
import { times } from '../source/util/times';

describe('stubString', () => {
    test('times(2, stubString) => ["", ""]', () => {
        expect(times(2, stubString)).toEqual(['', '']);
    });
});
