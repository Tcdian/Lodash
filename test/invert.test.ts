import { invert } from '../source/object/invert';

test(`invert({ a: 1, b: 2, c: 1 }) => ${invert({ a: 1, b: 2, c: 1 })}`, () => {
    expect(invert({ a: 1, b: 2, c: 1 })).toEqual({ '1': 'c', '2': 'b' });
});
