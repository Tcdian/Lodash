import { updateWith } from '../source/object/updateWith';
import { constant } from '../source/util/constant';

describe('updateWith', () => {
    test('updateWith({}, "[0][1]", constant("a"), Object) => { "0": { "1": "a" } }', () => {
        expect(updateWith({}, '[0][1]', constant('a'), Object)).toEqual({ '0': { '1': 'a' } });
    });
});
