import { keys } from '../source/object/keys';
import { create } from '../source/object/create';

describe('keys', () => {
    test('keys(create({ a: 1 }, { b: 2, c: 3 })) => ["b", "c"]', () => {
        const object = create({ a: 1 }, { b: 2, c: 3 });
        expect(keys(object)).toEqual(['b', 'c']);
    });

    test('keys("hi") => ["0", "1"]', () => {
        expect(keys('hi')).toEqual(['0', '1']);
    });
});
