import { noop } from '../source/util/noop';
//todo ...
import _ from 'lodash';

describe('noop', () => {
    test('times(2, noop) => [undefined, undefined]', () => {
        expect(_.times(2, noop)).toEqual([undefined, undefined]);
    });
});
