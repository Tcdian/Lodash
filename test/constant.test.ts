import { constant } from '../source/util/constant';
// todo ...
import _ from 'lodash';

describe('constant', () => {
    test('times(2, constant({ a: 1 })) => [{ a: 1 }, { a: 1 }]', () => {
        const objects = _.times(2, constant({ a: 1 }));
        expect(objects).toEqual([{ a: 1 }, { a: 1 }]);
        expect(objects[0]).toBe(objects[1]);
    });
});
