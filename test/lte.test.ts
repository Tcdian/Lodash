import _ from 'lodash';
import lte from '../source/lte';

test(`lte(1, 3) => ${lte(1, 3)}`, () => {
    expect(lte(1, 3)).toBe(_.lte(1, 3));
});

test(`lte(3, 3) => ${lte(3, 3)}`, () => {
    expect(lte(3, 3)).toBe(_.lte(3, 3));
});

test(`lte(3, 1) => ${lte(3, 1)}`, () => {
    expect(lte(3, 1)).toBe(_.lte(3, 1));
});
