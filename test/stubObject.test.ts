import { stubObject } from '../source/util/stubObject';
//todo ...
import _ from 'lodash';

describe('stubObject', () => {
    test('times(2, stubObject) => [{}, {}]', () => {
        const objects = _.times(2, stubObject);
        expect(objects).toEqual([{}, {}]);
        expect(objects[0]).not.toBe(objects[1]);
    });
});
