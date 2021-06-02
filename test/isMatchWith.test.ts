import { isMatchWith } from '../source/lang/isMatchWith';

test('isMatchWith', () => {
    function isGreeting(value: string) {
        return /^h(?:i|ello)$/.test(value);
    }

    function customizer(objValue: string, srcValue: string) {
        if (isGreeting(objValue) && isGreeting(srcValue)) {
            return true;
        }
    }

    expect(isMatchWith('hello', 'hi', isGreeting)).toBe(true);
    expect(isMatchWith({ greeting: 'hello' }, { greeting: 'hi' }, customizer)).toBe(true);
});
