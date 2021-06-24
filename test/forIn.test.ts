import { forIn } from '../source/object/forIn';

interface Foo {
    a: number;
    b: number;
    c: number;
}

interface FooConstructor {
    new (): Foo;
    (): void;
}

describe('forIn', () => {
    test('Iterates over own and inherited enumerable string keyed properties', () => {
        const Foo = function (this: Foo) {
            this.a = 1;
            this.b = 2;
        } as FooConstructor;
        Foo.prototype.c = 3;

        let entries: [string, number][] = [];
        forIn(new Foo(), function (value, key) {
            entries = [...entries, [key, value]];
        });
        expect(entries).toEqual([
            ['a', 1],
            ['b', 2],
            ['c', 3],
        ]);
    });
});
