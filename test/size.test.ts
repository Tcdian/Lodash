import { size } from '../source/collection/size';

test(`size([1, 2, 3]) => ${size([1, 2, 3])}`, () => {
    expect(size([1, 2, 3])).toBe(3);
});

test(`size({ 'a': 1, 'b': 2 }) => ${size({ a: 1, b: 2 })}`, () => {
    expect(size({ a: 1, b: 2 })).toBe(2);
});

test(`size('pebbles') => ${size('pebbles')}`, () => {
    expect(size('pebbles')).toBe(7);
});

test(`size(new Set([1, 2, 3])) => ${size(new Set([1, 2, 3]))}`, () => {
    expect(size(new Set([1, 2, 3]))).toBe(3);
});

test(`size(new Map([[1, 1]])) => ${size(new Map([[1, 1]]))}`, () => {
    expect(size(new Map([[1, 1]]))).toBe(1);
});
