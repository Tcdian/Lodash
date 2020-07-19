import { first } from '../source/array/first';

test(`first([1, 2, 3]) => ${first([1, 2, 3])}`, () => {
    expect(first([1, 2, 3])).toEqual(1);
});

test(`first([]) => ${first([])}`, () => {
    expect(first([])).toEqual(undefined);
});
