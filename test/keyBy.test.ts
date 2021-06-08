import { keyBy } from '../source/collection/keyBy';

describe('keyBy', () => {
    const array = [
        { dir: 'left', code: 97 },
        { dir: 'right', code: 100 },
    ];

    test('keyBy iterator', () => {
        expect(keyBy(array, (o) => String.fromCharCode(o.code))).toEqual({
            a: { dir: 'left', code: 97 },
            d: { dir: 'right', code: 100 },
        });
    });

    test('The "property" iteratee shorthand.', () => {
        expect(keyBy(array, 'dir')).toEqual({ left: { dir: 'left', code: 97 }, right: { dir: 'right', code: 100 } });
    });
});
