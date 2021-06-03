import { zipObjectDeep } from '../source/array/zipObjectDeep';

describe('zipObjectDeep', () => {
    test('zipObjectDeep(["a.b[0].c", "a.b[1].d"], [1, 2]) => { a: { b: [{ c: 1 }, { d: 2 }] } }', () => {
        expect(zipObjectDeep(['a.b[0].c', 'a.b[1].d'], [1, 2])).toEqual({ a: { b: [{ c: 1 }, { d: 2 }] } });
    });
});
