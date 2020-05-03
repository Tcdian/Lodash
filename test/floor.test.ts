import _ from 'lodash';
import floor from '../source/floor';

test(`floor(4.006) => ${floor(4.006)}`, () => {
    expect(floor(4.006)).toBe(_.floor(4.006));
});

test(`floor(0.046, 2) => ${floor(0.046, 2)}`, () => {
    expect(floor(0.046, 2)).toBe(_.floor(0.046, 2));
});

test(`floor(4060, -2) => ${floor(4060, -2)}`, () => {
    expect(floor(4060, -2)).toBe(_.floor(4060, -2));
});
