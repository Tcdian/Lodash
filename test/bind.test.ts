import { bind } from '../source/function/bind';

describe('bind', () => {
    const object = { user: 'fred' };

    function greet(this: typeof object, greeting: string, punctuation: string) {
        return greeting + ' ' + this.user + punctuation;
    }

    test('bind this', () => {
        const bound = bind(greet, object, 'hi');
        expect(bound('!')).toBe('hi fred!');
    });

    test('bind with placeholders', () => {
        const bound = bind(greet, object, '_', '!');
        expect(bound('hi')).toBe('hi fred!');
    });
});
