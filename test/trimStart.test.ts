import _ from 'lodash';
import trimStart from '../source/trimStart';

test(`trimStart('  abc  ') => ${trimStart('  abc  ')}`, () => {
    expect(trimStart('  abc  ')).toBe(_.trimStart('  abc  '));
});

test(`trimStart('-_-abc-_-', '_-') => ${trimStart('-_-abc-_-', '_-')}`, () => {
    expect(trimStart('-_-abc-_-', '_-')).toBe(_.trimStart('-_-abc-_-', '_-'));
});
