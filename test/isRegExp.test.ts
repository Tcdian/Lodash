import { isRegExp } from '../source/lang/isRegExp';

describe('isRegExp', () => {
    test('isRegExp(/abc/) => true', () => {
        expect(isRegExp(/abc/)).toBe(true);
    });

    test('isRegExp("/ abc /") => false', () => {
        expect(isRegExp('/abc/')).toBe(false);
    });
});
