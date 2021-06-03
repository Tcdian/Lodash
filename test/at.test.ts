import { at } from '../source/object/at';

describe('at', () => {
    test('at(object, ["a[0].b.c", "a[1]"]) => [3, 4]', () => {
        const object = { a: [{ b: { c: 3 } }, 4] };
        expect(at(object, ['a[0].b.c', 'a[1]'])).toEqual([3, 4]);
    });
});
