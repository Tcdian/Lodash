import _ from 'lodash';
import { bind } from '../source/function/bind';

const object = { user: 'fred' };

function greet(this: typeof object, greeting: string, punctuation: string) {
    return greeting + ' ' + this.user + punctuation;
}

test('bind', () => {
    const bound = bind(greet, object, 'hi');
    const _bound = _.bind(greet, object, 'hi');
    expect(bound('!')).toBe(_bound('!'));
});

test('bind with placeholders', () => {
    const bound = bind(greet, object, '_', '!');
    const _bound = _.bind(greet, object, _, '!');
    expect(bound('hi')).toBe(_bound('hi'));
});
