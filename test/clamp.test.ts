import _ from 'lodash';
import { clamp } from '../source/number';

test(`clamp(-10, -5, 5) => ${clamp(-10, -5, 5)}`, () => {
    expect(clamp(-10, -5, 5)).toBe(_.clamp(-10, -5, 5));
});

test(`clamp(10, -5, 5) => ${clamp(10, -5, 5)}`, () => {
    expect(clamp(10, -5, 5)).toBe(_.clamp(10, -5, 5));
});

test(`clamp(0, -5, 5) => ${clamp(0, -5, 5)}`, () => {
    expect(clamp(0, -5, 5)).toBe(_.clamp(0, -5, 5));
});
