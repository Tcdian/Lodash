import { trimEnd } from '../source/string/trimEnd';

test(`trimEnd('  abc  ') => ${trimEnd('  abc  ')}`, () => {
    expect(trimEnd('  abc  ')).toBe('  abc');
});

test(`trimEnd('-_-abc-_-', '_-') => ${trimEnd('-_-abc-_-', '_-')}`, () => {
    expect(trimEnd('-_-abc-_-', '_-')).toBe('-_-abc');
});

test(`['  foo  ', '  bar  '].map(trimEnd) => ${['  foo  ', '  bar  '].map(trimEnd)}`, () => {
    expect(['  foo  ', '  bar  '].map(trimEnd)).toEqual(['  foo', '  bar']);
});
