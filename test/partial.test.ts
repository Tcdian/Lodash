import { partial } from '../source/function/partial';

describe('partial', () => {
    function greet(greeting: string, name: string) {
        return greeting + ' ' + name;
    }

    test('partial', () => {
        const sayHelloTo = partial(greet, 'hello');
        expect(sayHelloTo('fred')).toBe('hello fred');
    });

    test('partial with placeholders', () => {
        const greetFred = partial(greet, '_', 'fred');
        expect(greetFred('hi')).toBe('hi fred');
    });
});
