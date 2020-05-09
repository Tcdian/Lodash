import _ from 'lodash';
import trimEnd from '../source/trimEnd';

test(`trimEnd('  abc  ') => ${trimEnd('  abc  ')}`, () => {
    expect(trimEnd('  abc  ')).toBe(_.trimEnd('  abc  '));
});

test(`trimEnd('-_-abc-_-', '_-') => ${trimEnd('-_-abc-_-', '_-')}`, () => {
    expect(trimEnd('-_-abc-_-', '_-')).toBe(_.trimEnd('-_-abc-_-', '_-'));
});
