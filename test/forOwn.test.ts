import { forOwn } from '../source/object/forOwn';

interface Foo {
    a: number;
    b: number;
    c: number;
}

interface FooConstructor {
    new (): Foo;
    (): void;
}

describe('forOwn', () => {
    test('Iterates over own enumerable string keyed properties', () => {
        const Foo = function (this: Foo) {
            this.a = 1;
            this.b = 2;
        } as FooConstructor;

        Foo.prototype.c = 3;

        let entries: [string, number][] = [];
        forOwn(new Foo(), function (value, key) {
            entries = [...entries, [key, value]];
        });
        expect(entries).toEqual([
            ['a', 1],
            ['b', 2],
        ]);
    });
});
