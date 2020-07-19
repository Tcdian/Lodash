import { isNative } from '../source/lang/isNative';

test(`isNative(Array.prototype.push) => ${isNative(Array.prototype.push)}`, () => {
    expect(isNative(Array.prototype.push)).toBe(true);
});
