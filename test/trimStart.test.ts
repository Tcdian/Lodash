import _ from 'lodash';
import { trimStart } from '../source/string/trimStart';

test(`trimStart('  abc  ') => ${trimStart('  abc  ')}`, () => {
    expect(trimStart('  abc  ')).toBe(_.trimStart('  abc  '));
});

test(`trimStart('-_-abc-_-', '_-') => ${trimStart('-_-abc-_-', '_-')}`, () => {
    expect(trimStart('-_-abc-_-', '_-')).toBe(_.trimStart('-_-abc-_-', '_-'));
});

test(`_.map(['  foo  ', '  bar  '], _.trimStart) => ${_.map(['  foo  ', '  bar  '], trimStart)}`, () => {
    expect(_.map(['  foo  ', '  bar  '], trimStart)).toEqual(_.map(['  foo  ', '  bar  '], _.trimStart));
});
