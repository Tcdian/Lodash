import { propertyOf } from '../source/util/propertyOf';

const array = [0, 1, 2];
const object = { a: array, b: array, c: array };

test(`['a[2]', 'c[0]'].map(propertyOf(object)) => ${['a[2]', 'c[0]'].map(propertyOf(object))}`, () => {
    expect(['a[2]', 'c[0]'].map(propertyOf(object))).toEqual([2, 0]);
});

test(`[['a', '2'], ['c', '0']].map(propertyOf(object)) => ${[
    ['a', '2'],
    ['c', '0'],
].map(propertyOf(object))}`, () => {
    expect(
        [
            ['a', '2'],
            ['c', '0'],
        ].map(propertyOf(object))
    ).toEqual([2, 0]);
});
