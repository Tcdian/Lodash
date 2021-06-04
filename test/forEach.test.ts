import { forEach } from '../source/collection/forEach';

describe('forEach', () => {
    test('forEach Array', () => {
        let entries: [number, number][] = [];
        forEach([1, 2], (value, index) => {
            entries = [...entries, [index, value]];
        });
        expect(entries).toEqual([
            [0, 1],
            [1, 2],
        ]);
    });

    test('forEach Object', () => {
        let entries: [string, number][] = [];
        forEach({ a: 1, b: 2 }, (value, key) => {
            entries = [...entries, [key, value]];
        });
        expect(entries).toEqual([
            ['a', 1],
            ['b', 2],
        ]);
    });

    test('forEach String', () => {
        let entries: [number, string][] = [];
        forEach('12', (char, index) => {
            entries = [...entries, [index, char]];
        });
        expect(entries).toEqual([
            [0, '1'],
            [1, '2'],
        ]);
    });
});
