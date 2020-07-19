import { inRange } from '../source/number/inRange';

test(`inRange(3, 2, 4) => ${inRange(3, 2, 4)}`, () => {
    expect(inRange(3, 2, 4)).toBe(true);
});

test(`inRange(4, 8) => ${inRange(4, 8)}`, () => {
    expect(inRange(4, 8)).toBe(true);
});

test(`inRange(4, 2) => ${inRange(4, 2)}`, () => {
    expect(inRange(4, 2)).toBe(false);
});

test(`inRange(2, 2) => ${inRange(2, 2)}`, () => {
    expect(inRange(2, 2)).toBe(false);
});

test(`inRange(1.2, 2) => ${inRange(1.2, 2)}`, () => {
    expect(inRange(1.2, 2)).toBe(true);
});

test(`inRange(5.2, 4) => ${inRange(5.2, 4)}`, () => {
    expect(inRange(5.2, 4)).toBe(false);
});

test(`inRange(-3, -2, -6) => ${inRange(-3, -2, -6)}`, () => {
    expect(inRange(-3, -2, -6)).toBe(true);
});
