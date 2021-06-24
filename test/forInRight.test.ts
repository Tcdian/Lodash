import { forInRight } from '../source/object/forInRight';

interface Foo {
    a: number;
    b: number;
    c: number;
}

interface FooConstructor {
    new (): Foo;
    (): void;
}

describe('forInRight', () => {
    test('Iterates over own and inherited enumerable string keyed properties', () => {
        const Foo = function (this: Foo) {
            this.a = 1;
            this.b = 2;
        } as FooConstructor;
        Foo.prototype.c = 3;

        let entries: [string, number][] = [];
        forInRight(new Foo(), function (value, key) {
            entries = [...entries, [key, value]];
        });
        expect(entries).toEqual([
            ['c', 3],
            ['b', 2],
            ['a', 1],
        ]);
    });
});
