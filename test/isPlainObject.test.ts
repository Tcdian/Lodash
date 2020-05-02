import _ from 'lodash';
import isPlainObject from '../source/isPlainObject';

class Foo {
    public size: number;
    constructor() {
        this.size = 1;
    }
}

test(`isPlainObject(new Foo) => ${isPlainObject(new Foo())}`, () => {
    expect(isPlainObject(new Foo())).toBe(_.isPlainObject(new Foo()));
});

test(`isPlainObject([1, 2, 3]) => ${isPlainObject([1, 2, 3])}`, () => {
    expect(isPlainObject([1, 2, 3])).toBe(_.isPlainObject([1, 2, 3]));
});

test(`isPlainObject({ 'x': 0, 'y': 0 }) => ${isPlainObject({ x: 0, y: 0 })}`, () => {
    expect(isPlainObject({ x: 0, y: 0 })).toBe(_.isPlainObject({ x: 0, y: 0 }));
});

test(`isPlainObject(Object.create(null)) => ${isPlainObject(Object.create(null))}`, () => {
    expect(isPlainObject(Object.create(null))).toBe(_.isPlainObject(Object.create(null)));
});
