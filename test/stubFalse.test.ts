import { stubFalse } from '../source/util/stubFalse';
import { times } from '../source/util/times';

describe('stubFalse', () => {
    test('times(2, stubFalse) => [false, false]', () => {
        expect(times(2, stubFalse)).toEqual([false, false]);
    });
});
