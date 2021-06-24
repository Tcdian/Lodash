import { forOwnRight } from '../source/object/forOwnRight';

interface Foo {
    a: number;
    b: number;
    c: number;
}

interface FooConstructor {
    new (): Foo;
    (): void;
}

describe('forOwnRight', () => {
    test('Iterates over own enumerable string keyed properties', () => {
        const Foo = function (this: Foo) {
            this.a = 1;
            this.b = 2;
        } as FooConstructor;

        Foo.prototype.c = 3;

        let entries: [string, number][] = [];
        forOwnRight(new Foo(), function (value, key) {
            entries = [...entries, [key, value]];
        });
        expect(entries).toEqual([
            ['b', 2],
            ['a', 1],
        ]);
    });
});
