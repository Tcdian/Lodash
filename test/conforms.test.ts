import { conforms } from '../source/util/conforms';

describe('conforms', () => {
    test('conforms', () => {
        const objects = [
            { a: 2, b: 1 },
            { a: 1, b: 2 },
        ];
        expect(objects.filter(conforms({ b: (n) => n > 1 }))).toEqual([{ a: 1, b: 2 }]);
    });
});
