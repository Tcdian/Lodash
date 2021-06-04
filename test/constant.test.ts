import { constant } from '../source/util/constant';
import { times } from '../source/util/times';

describe('constant', () => {
    test('times(2, constant({ a: 1 })) => [{ a: 1 }, { a: 1 }]', () => {
        const objects = times(2, constant({ a: 1 }));
        expect(objects).toEqual([{ a: 1 }, { a: 1 }]);
        expect(objects[0]).toBe(objects[1]);
    });
});
