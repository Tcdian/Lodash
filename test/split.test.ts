import { split } from '../source/string/split';

test(`split('a-b-c', '-') => ${split('a-b-c', '-')}`, () => {
    expect(split('a-b-c', '-')).toEqual(['a', 'b', 'c']);
});

test(`split('a-b-c', '-', 2) => ${split('a-b-c', '-', 2)}`, () => {
    expect(split('a-b-c', '-', 2)).toEqual(['a', 'b']);
});
