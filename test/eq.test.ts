import _ from 'lodash';
import { eq } from '../source/lang';

test(`eq('a', 'a') => ${eq('a', 'a')}`, () => {
    expect(eq('a', 'a')).toBe(_.eq('a', 'a'));
});

test(`eq('a', Object('a')) => ${eq('a', Object('a'))}`, () => {
    expect(eq('a', Object('a'))).toBe(_.eq('a', Object('a')));
});

test(`eq({ 'a': 1 }, { 'a': 1 }) => ${eq({ a: 1 }, { a: 1 })}`, () => {
    expect(eq({ a: 1 }, { a: 1 })).toBe(_.eq({ a: 1 }, { a: 1 }));
});

test(`eq(NaN, NaN) => ${eq(NaN, NaN)}`, () => {
    expect(eq(NaN, NaN)).toBe(_.eq(NaN, NaN));
});
