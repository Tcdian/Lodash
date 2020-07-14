import _ from 'lodash';
import { round } from '../source/math/round';

test(`round(4.006) => ${round(4.006)}`, () => {
    expect(round(4.006)).toBe(_.round(4.006));
});

test(`round(4.006, 2) => ${round(4.006, 2)}`, () => {
    expect(round(4.006, 2)).toBe(_.round(4.006, 2));
});

test(`round(4060, -2) => ${round(4060, -2)}`, () => {
    expect(round(4060, -2)).toBe(_.round(4060, -2));
});
