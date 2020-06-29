import _ from 'lodash';
import { trim } from '../source/string';

test(`trim('  abc  ') => ${trim('  abc  ')}`, () => {
    expect(trim('  abc  ')).toBe(_.trim('  abc  '));
});

test(`trim('-_-abc-_-', '_-') => ${trim('-_-abc-_-', '_-')}`, () => {
    expect(trim('-_-abc-_-', '_-')).toBe(_.trim('-_-abc-_-', '_-'));
});

test(`_.map(['  foo  ', '  bar  '], _.trim) => ${_.map(['  foo  ', '  bar  '], trim)}`, () => {
    expect(_.map(['  foo  ', '  bar  '], trim)).toEqual(_.map(['  foo  ', '  bar  '], _.trim));
});
