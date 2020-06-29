import _ from 'lodash';
import { endsWith } from '../source/string';

test(`endsWith('abc', 'c') => ${endsWith('abc', 'c')}`, () => {
    expect(endsWith('abc', 'c')).toBe(_.endsWith('abc', 'c'));
});

test(`endsWith('abc', 'b') => ${endsWith('abc', 'b')}`, () => {
    expect(endsWith('abc', 'b')).toBe(_.endsWith('abc', 'b'));
});

test(`endsWith('abc', 'b', 2) => ${endsWith('abc', 'b', 2)}`, () => {
    expect(endsWith('abc', 'b', 2)).toBe(_.endsWith('abc', 'b', 2));
});
