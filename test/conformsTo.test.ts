import { conformsTo } from '../source/lang/conformsTo';

const object = { a: 1, b: 2 };

test("conformsTo({ 'a': 1, 'b': 2 }, { 'b': function(n) { return n > 1; } }) => true", () => {
    expect(
        conformsTo(object, {
            b: function (n) {
                return n > 1;
            },
        })
    ).toBe(true);
});

test("conformsTo({ a: 1, b: 2 }, { 'b': function(n) { return n > 2; } })", () => {
    expect(
        conformsTo(object, {
            b: function (n) {
                return n > 2;
            },
        })
    ).toBe(false);
});
