import _ from 'lodash';
import { inRange } from '../source/number/inRange';

test(`inRange(3, 2, 4) => ${inRange(3, 2, 4)}`, () => {
    expect(inRange(3, 2, 4)).toBe(_.inRange(3, 2, 4));
});

test(`inRange(4, 8) => ${inRange(4, 8)}`, () => {
    expect(inRange(4, 8)).toBe(_.inRange(4, 8));
});

test(`inRange(4, 2) => ${inRange(4, 2)}`, () => {
    expect(inRange(4, 2)).toBe(_.inRange(4, 2));
});

test(`inRange(2, 2) => ${inRange(2, 2)}`, () => {
    expect(inRange(2, 2)).toBe(_.inRange(2, 2));
});

test(`inRange(1.2, 2) => ${inRange(1.2, 2)}`, () => {
    expect(inRange(1.2, 2)).toBe(_.inRange(1.2, 2));
});

test(`inRange(5.2, 4) => ${inRange(5.2, 4)}`, () => {
    expect(inRange(5.2, 4)).toBe(_.inRange(5.2, 4));
});

test(`inRange(-3, -2, -6) => ${inRange(-3, -2, -6)}`, () => {
    expect(inRange(-3, -2, -6)).toBe(_.inRange(-3, -2, -6));
});
