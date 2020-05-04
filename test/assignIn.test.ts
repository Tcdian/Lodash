import _ from 'lodash';
import assignIn from '../source/assignIn';

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

test('assignIn', () => {
    expect(assignIn({ a: 0 }, foo)).toEqual(_.assignIn({ a: 0 }, foo));
});

test('assignIn', () => {
    expect(assignIn({ a: 0 }, bar)).toEqual(_.assignIn({ a: 0 }, bar));
});

test('assignIn', () => {
    expect(assignIn({ a: 0 }, foo, bar)).toEqual(_.assignIn({ a: 0 }, foo, bar));
});
