import { stubString } from '../source/util/stubString';
//todo ...
import _ from 'lodash';

describe('stubString', () => {
    test('times(2, stubString) => ["", ""]', () => {
        expect(_.times(2, stubString)).toEqual(['', '']);
    });
});
