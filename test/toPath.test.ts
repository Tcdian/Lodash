import { toPath } from '../source/util/toPath';

describe('toPath', () => {
    test('toPath("a.b.c") => ["a", "b", "c"]', () => {
        expect(toPath('a.b.c')).toEqual(['a', 'b', 'c']);
    });

    test('toPath("a[0].b.c") => ["a", "0", "b", "c"]', () => {
        expect(toPath('a[0].b.c')).toEqual(['a', '0', 'b', 'c']);
    });

    test('toPath("a[0][1].b[2]") => ["a", "0", "1", "b", "2"]', () => {
        expect(toPath('a[0][1].b[2]')).toEqual(['a', '0', '1', 'b', '2']);
    });
});
