import _ from 'lodash';
import repeat from '../source/repeat';

test(`repeat => ${repeat('*', 3)}`, () => {
    expect(repeat('*', 3)).toBe(_.repeat('*', 3));
});

test(`repeat('abc', 2) => ${repeat('abc', 2)}`, () => {
    expect(repeat('abc', 2)).toBe(_.repeat('abc', 2));
});

test(`repeat('abc', 0) => ${repeat('abc', 0)}`, () => {
    expect(repeat('abc', 0)).toBe(_.repeat('abc', 0));
});
