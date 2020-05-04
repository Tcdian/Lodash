import _ from 'lodash';
import assign from '../source/assign';

class Foo {
    static b = 2;
    public a: number;
    constructor() {
        this.a = 1;
    }
}

class Bar {
    static d = 4;
    public c: number;
    constructor() {
        this.c = 3;
    }
}

let foo: Foo;
let bar: Bar;

beforeEach(() => {
    foo = new Foo();
    bar = new Bar();
});

test('assign', () => {
    expect(assign({ a: 0 }, foo)).toEqual(_.assign({ a: 0 }, foo));
});

test('assign', () => {
    expect(assign({ a: 0 }, bar)).toEqual(_.assign({ a: 0 }, bar));
});

test('assign', () => {
    expect(assign({ a: 0 }, foo, bar)).toEqual(_.assign({ a: 0 }, foo, bar));
});
