import { isEqualWith } from '../source/lang/isEqualWith';

test('isEqualWith', () => {
    function isGreeting(value: string) {
        return /^h(?:i|ello)$/.test(value);
    }

    function customizer(objValue: string, othValue: string) {
        if (isGreeting(objValue) && isGreeting(othValue)) {
            return true;
        }
    }

    expect(isEqualWith('hello', 'hi', isGreeting)).toBe(true);
    expect(isEqualWith(['hello', 'goodbye'], ['hi', 'goodbye'], customizer)).toBe(true);
});
