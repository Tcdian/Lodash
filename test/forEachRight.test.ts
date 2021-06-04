import { forEachRight } from '../source/collection/forEachRight';

describe('forEachRight', () => {
    test('forEachRight Array', () => {
        let entries: [number, number][] = [];
        forEachRight([1, 2], (value, index) => {
            entries = [...entries, [index, value]];
        });
        expect(entries).toEqual([
            [1, 2],
            [0, 1],
        ]);
    });

    test('forEachRight Object', () => {
        let entries: [string, number][] = [];
        forEachRight({ a: 1, b: 2 }, (value, key) => {
            entries = [...entries, [key, value]];
        });
        expect(entries).toEqual([
            ['b', 2],
            ['a', 1],
        ]);
    });

    test('forEachRight String', () => {
        let entries: [number, string][] = [];
        forEachRight('12', (char, index) => {
            entries = [...entries, [index, char]];
        });
        expect(entries).toEqual([
            [1, '2'],
            [0, '1'],
        ]);
    });
});
