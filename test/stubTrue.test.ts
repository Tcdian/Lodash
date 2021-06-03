import { stubTrue } from '../source/util/stubTrue';
//todo ...
import _ from 'lodash';

describe('stubTrue', () => {
    test('times(2, stubTrue) => [true, true]', () => {
        expect(_.times(2, stubTrue)).toEqual([true, true]);
    });
});
