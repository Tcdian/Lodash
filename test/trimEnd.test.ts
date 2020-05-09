import _ from 'lodash';
import trimEnd from '../source/trimEnd';

test(`trimEnd('  abc  ') => ${trimEnd('  abc  ')}`, () => {
    expect(trimEnd('  abc  ')).toBe(_.trimEnd('  abc  '));
});

test(`trimEnd('-_-abc-_-', '_-') => ${trimEnd('-_-abc-_-', '_-')}`, () => {
    expect(trimEnd('-_-abc-_-', '_-')).toBe(_.trimEnd('-_-abc-_-', '_-'));
});

test(`_.map(['  foo  ', '  bar  '], _.trimEnd) => ${_.map(['  foo  ', '  bar  '], trimEnd)}`, () => {
    expect(_.map(['  foo  ', '  bar  '], trimEnd)).toEqual(_.map(['  foo  ', '  bar  '], _.trimEnd));
});
