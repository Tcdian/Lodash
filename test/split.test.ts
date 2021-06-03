import { split } from '../source/string/split';

describe('split', () => {
    test('split("a-b-c", "-") => ["a", "b", "c"]', () => {
        expect(split('a-b-c', '-')).toEqual(['a', 'b', 'c']);
    });

    test('split("a-b-c", "-", 2) => ["a", "b"]', () => {
        expect(split('a-b-c', '-', 2)).toEqual(['a', 'b']);
    });
});
