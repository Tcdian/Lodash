import { isFunction } from '../source/lang/isFunction';

describe('isFunction', () => {
    test('isFunction(() => {}) => true', () => {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        expect(isFunction(() => {})).toBe(true);
    });

    test('isFunction(/abc/) => true', () => {
        expect(isFunction(/abc/)).toBe(false);
    });
});
