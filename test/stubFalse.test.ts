import { stubFalse } from '../source/util/stubFalse';
//todo ...
import _ from 'lodash';

describe('stubFalse', () => {
    test('times(2, stubFalse) => [false, false]', () => {
        expect(_.times(2, stubFalse)).toEqual([false, false]);
    });
});
