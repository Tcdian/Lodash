import { padEnd } from '../source/string/padEnd';

test(`padEnd('abc', 6) => ${padEnd('abc', 6)}`, () => {
    expect(padEnd('abc', 6)).toBe('abc   ');
});

test(`padEnd('abc', 6, '_-') => ${padEnd('abc', 6, '_-')}`, () => {
    expect(padEnd('abc', 6, '_-')).toBe('abc_-_');
});

test(`padEnd('abc', 3) => ${padEnd('abc', 3)}`, () => {
    expect(padEnd('abc', 3)).toBe('abc');
});
