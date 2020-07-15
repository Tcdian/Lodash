import _ from 'lodash';
import { bindKey } from '../source/function/bindKey';

const object = {
    user: 'fred',
    greet: function (greeting: string, punctuation: string) {
        return greeting + ' ' + this.user + punctuation;
    },
};

test('bindKey', () => {
    const bound = bindKey(object, 'greet', 'hi');
    const _bound = _.bindKey(object, 'greet', 'hi');
    expect(bound('!')).toBe(_bound('!'));

    object.greet = function (greeting, punctuation) {
        return greeting + 'ya ' + this.user + punctuation;
    };
    expect(bound('!')).toBe(_bound('!'));
});

test('bindKey with placeholders', () => {
    const bound = bindKey(object, 'greet', '_', '!');
    const _bound = _.bindKey(object, 'greet', _, '!');
    expect(bound('hi')).toBe(_bound('hi'));
});
