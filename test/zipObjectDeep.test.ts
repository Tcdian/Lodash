import { zipObjectDeep } from '../source/array/zipObjectDeep';

test(`zipObjectDeep(['a.b[0].c', 'a.b[1].d'], [1, 2]) => ${zipObjectDeep(['a.b[0].c', 'a.b[1].d'], [1, 2])}`, () => {
    expect(zipObjectDeep(['a.b[0].c', 'a.b[1].d'], [1, 2])).toEqual({ a: { b: [{ c: 1 }, { d: 2 }] } });
});
