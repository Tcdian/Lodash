import { conforms } from '../source/util/conforms';

const objects = [
    { a: 2, b: 1 },
    { a: 1, b: 2 },
];

test('conforms', () => {
    expect(
        objects.filter(
            conforms({
                b: function (n) {
                    return n > 1;
                },
            })
        )
    ).toEqual([{ a: 1, b: 2 }]);
});
