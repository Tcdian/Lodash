import _ from 'lodash';
import { padEnd } from '../source/string/padEnd';

test(`padEnd('abc', 6) => ${padEnd('abc', 6)}`, () => {
    expect(padEnd('abc', 6)).toBe(_.padEnd('abc', 6));
});

test(`padEnd('abc', 6, '_-') => ${padEnd('abc', 6, '_-')}`, () => {
    expect(padEnd('abc', 6, '_-')).toBe(_.padEnd('abc', 6, '_-'));
});

test(`padEnd('abc', 3) => ${padEnd('abc', 3)}`, () => {
    expect(padEnd('abc', 3)).toBe(_.padEnd('abc', 3));
});
