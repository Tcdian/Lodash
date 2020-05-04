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

test('assign', () => {
    expect(assign({ a: 0 }, new Foo(), new Bar())).toEqual(_.assign({ a: 0 }, new Foo(), new Bar()));
});
