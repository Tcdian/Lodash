import { eq } from '../source/lang/eq';

test(`eq('a', 'a') => ${eq('a', 'a')}`, () => {
    expect(eq('a', 'a')).toBe(true);
});

test(`eq('a', Object('a')) => ${eq('a', Object('a'))}`, () => {
    expect(eq('a', Object('a'))).toBe(false);
});

test(`eq({ 'a': 1 }, { 'a': 1 }) => ${eq({ a: 1 }, { a: 1 })}`, () => {
    expect(eq({ a: 1 }, { a: 1 })).toBe(false);
});

test(`eq(NaN, NaN) => ${eq(NaN, NaN)}`, () => {
    expect(eq(NaN, NaN)).toBe(true);
});
