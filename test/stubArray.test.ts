import { stubArray } from '../source/util/stubArray';
//todo ...
import _ from 'lodash';

describe('stubArray', () => {
    test('times(2, stubArray) => [[], []]', () => {
        const arrays = _.times(2, stubArray);
        expect(arrays).toEqual([[], []]);
        expect(arrays[0]).not.toBe(arrays[1]);
    });
});
