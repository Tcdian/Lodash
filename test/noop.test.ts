import { noop } from '../source/util/noop';
import { times } from '../source/util/times';

describe('noop', () => {
    test('times(2, noop) => [undefined, undefined]', () => {
        expect(times(2, noop)).toEqual([undefined, undefined]);
    });
});
