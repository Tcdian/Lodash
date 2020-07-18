import _ from 'lodash';
import { partialRight } from '../source/function/partialRight';

function greet(greeting: string, name: string) {
    return greeting + ' ' + name;
}

test('partialRight', () => {
    const greetFred = partialRight(greet, 'fred');
    const _greetFred = _.partialRight(greet, 'fred');
    expect(greetFred('hi')).toBe(_greetFred('hi'));
});

test('partialRight with placeholders', () => {
    const sayHelloTo = partialRight(greet, 'hello', '_');
    const _sayHelloTo = _.partialRight(greet, 'hello', _);
    expect(sayHelloTo('fred')).toBe(_sayHelloTo('fred'));
});
