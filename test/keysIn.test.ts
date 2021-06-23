import { keysIn } from '../source/object/keysIn';
import { create } from '../source/object/create';

describe('keysIn', () => {
    test('Returns the array of own and inherited enumerable property names', () => {
        const object = create({ a: 1 }, { b: 2, c: 3 });
        expect(keysIn(object)).toEqual(['b', 'c', 'a']);
    });
});
