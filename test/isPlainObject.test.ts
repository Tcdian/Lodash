import { isPlainObject } from '../source/lang/isPlainObject';

class Foo {
    public size: number;
    constructor() {
        this.size = 1;
    }
}

test(`isPlainObject(new Foo) => ${isPlainObject(new Foo())}`, () => {
    expect(isPlainObject(new Foo())).toBe(false);
});

test(`isPlainObject([1, 2, 3]) => ${isPlainObject([1, 2, 3])}`, () => {
    expect(isPlainObject([1, 2, 3])).toBe(false);
});

test(`isPlainObject({ 'x': 0, 'y': 0 }) => ${isPlainObject({ x: 0, y: 0 })}`, () => {
    expect(isPlainObject({ x: 0, y: 0 })).toBe(true);
});

test(`isPlainObject(Object.create(null)) => ${isPlainObject(Object.create(null))}`, () => {
    expect(isPlainObject(Object.create(null))).toBe(true);
});
