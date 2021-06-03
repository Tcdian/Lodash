import { keysIn } from '../source/object/keysIn';
import { create } from '../source/object/create';

describe('keysIn', () => {
    test('keysIn(create({ a: 1 }, { b: 2, c: 3 })) => ["b", "c", "a"]', () => {
        const object = create({ a: 1 }, { b: 2, c: 3 });
        expect(keysIn(object)).toEqual(['b', 'c', 'a']);
    });
});
