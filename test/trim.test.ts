import { trim } from '../source/string/trim';

test(`trim('  abc  ') => ${trim('  abc  ')}`, () => {
    expect(trim('  abc  ')).toBe('abc');
});

test(`trim('-_-abc-_-', '_-') => ${trim('-_-abc-_-', '_-')}`, () => {
    expect(trim('-_-abc-_-', '_-')).toBe('abc');
});

test(`['  foo  ', '  bar  '].map(trim) => ${['  foo  ', '  bar  '].map(trim)}`, () => {
    expect(['  foo  ', '  bar  '].map(trim)).toEqual(['foo', 'bar']);
});
