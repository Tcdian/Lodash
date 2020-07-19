import { padStart } from '../source/string/padStart';

test(`padStart('abc', 6) => ${padStart('abc', 6)}`, () => {
    expect(padStart('abc', 6)).toBe('   abc');
});

test(`padStart('abc', 6, '_-') => ${padStart('abc', 6, '_-')}`, () => {
    expect(padStart('abc', 6, '_-')).toBe('_-_abc');
});

test(`padStart('abc', 3) => ${padStart('abc', 3)}`, () => {
    expect(padStart('abc', 3)).toBe('abc');
});
