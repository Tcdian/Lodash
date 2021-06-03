import { partialRight } from '../source/function/partialRight';

describe('partialRight', () => {
    function greet(greeting: string, name: string) {
        return greeting + ' ' + name;
    }

    test('partialRight', () => {
        const greetFred = partialRight(greet, 'fred');
        expect(greetFred('hi')).toBe('hi fred');
    });

    test('partialRight with placeholders', () => {
        const sayHelloTo = partialRight(greet, 'hello', '_');
        expect(sayHelloTo('fred')).toBe('hello fred');
    });
});
