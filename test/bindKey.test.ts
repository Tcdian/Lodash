import { bindKey } from '../source/function/bindKey';

describe('bindKey', () => {
    const object = {
        user: 'fred',
        greet: function (greeting: string, punctuation: string) {
            return greeting + ' ' + this.user + punctuation;
        },
    };

    test('bindKey', () => {
        const bound = bindKey(object, 'greet', 'hi');
        expect(bound('!')).toBe('hi fred!');

        object.greet = function (greeting, punctuation) {
            return greeting + 'ya ' + this.user + punctuation;
        };
        expect(bound('!')).toBe('hiya fred!');
    });

    test('bindKey with placeholders', () => {
        const bound = bindKey(object, 'greet', '_', '!');
        expect(bound('hi')).toBe('hiya fred!');
    });
});
