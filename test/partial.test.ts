import _ from 'lodash';
import { partial } from '../source/function/partial';

function greet(greeting: string, name: string) {
    return greeting + ' ' + name;
}

test('partial', () => {
    const sayHelloTo = partial(greet, 'hello');
    const _sayHelloTo = _.partial(greet, 'hello');
    expect(sayHelloTo('fred')).toBe(_sayHelloTo('fred'));
});

test('partial with placeholders', () => {
    const greetFred = partial(greet, '_', 'fred');
    const _greetFred = _.partial(greet, _, 'fred');
    expect(greetFred('hi')).toBe(_greetFred('hi'));
});
