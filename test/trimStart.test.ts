import { trimStart } from '../source/string/trimStart';

test(`trimStart('  abc  ') => ${trimStart('  abc  ')}`, () => {
    expect(trimStart('  abc  ')).toBe('abc  ');
});

test(`trimStart('-_-abc-_-', '_-') => ${trimStart('-_-abc-_-', '_-')}`, () => {
    expect(trimStart('-_-abc-_-', '_-')).toBe('abc-_-');
});

test(`['  foo  ', '  bar  '].map(trimStart) => ${['  foo  ', '  bar  '].map(trimStart)}`, () => {
    expect(['  foo  ', '  bar  '].map(trimStart)).toEqual(['foo  ', 'bar  ']);
});
