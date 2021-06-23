import { isNative } from '../source/lang/isNative';

describe('isNative', () => {
    test('isNative(Array.prototype.push) => true', () => {
        expect(isNative(Array.prototype.push)).toBe(true);
    });

    test('isNative(() => {}) => false', () => {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        expect(isNative(() => {})).toBe(false);
    });
});
