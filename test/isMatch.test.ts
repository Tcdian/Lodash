import { isMatch } from '../source/lang/isMatch';

test('isMatch', () => {
    expect(isMatch({ a: 1, b: 2 }, { b: 2 })).toBe(true);
    expect(isMatch({ a: 1, b: 2 }, { b: 1 })).toBe(false);
    expect(isMatch({ a: 1, b: 2 }, { a: 1, b: 2, c: 3 })).toBe(false);
});
