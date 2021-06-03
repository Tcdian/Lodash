import { isMatchWith } from '../source/lang/isMatchWith';

describe('isMatchWith', () => {
    test('isMatchWith with customizer', () => {
        function isGreeting(value: string) {
            return /^h(?:i|ello)$/.test(value);
        }

        function customizer(objValue: string, srcValue: string) {
            if (isGreeting(objValue) && isGreeting(srcValue)) {
                return true;
            }
        }

        expect(isMatchWith({ greeting: 'hello' }, { greeting: 'hi' }, customizer)).toBe(true);
    });
});
