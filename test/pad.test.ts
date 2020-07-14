import _ from 'lodash';
import { pad } from '../source/string/pad';

test(`pad('abc', 8) => ${pad('abc', 8)}`, () => {
    expect(pad('abc', 8)).toBe(_.pad('abc', 8));
});

test(`pad('abc', 8, '_-') => ${pad('abc', 8, '_-')}`, () => {
    expect(pad('abc', 8, '_-')).toBe(_.pad('abc', 8, '_-'));
});

test(`pad('abc', 3) => ${pad('abc', 3)}`, () => {
    expect(pad('abc', 3)).toBe(_.pad('abc', 3));
});
