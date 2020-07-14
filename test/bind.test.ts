import _ from 'lodash';
import { bind } from '../source/function/bind';

const object = { user: 'fred' };

function greet(this: typeof object, greeting: string, punctuation: string) {
    return greeting + ' ' + this.user + punctuation;
}

test('bind', () => {
    expect(bind(greet, object, 'hi')('!')).toBe(_.bind(greet, object, 'hi')('!'));
});

test('bind with placeholders', () => {
    expect(bind(greet, object, '_', '!')('hi')).toBe(_.bind(greet, object, _, '!')('hi'));
});
