import { isPlainObject } from '../source/lang/isPlainObject';

describe('isPlainObject', () => {
    class Foo {
        public size: number;
        constructor() {
            this.size = 1;
        }
    }

    test('isPlainObject(new Foo) => false', () => {
        expect(isPlainObject(new Foo())).toBe(false);
    });

    test('isPlainObject([1, 2, 3]) => false', () => {
        expect(isPlainObject([1, 2, 3])).toBe(false);
    });

    test('isPlainObject({ x: 0, y: 0 }) => true', () => {
        expect(isPlainObject({ x: 0, y: 0 })).toBe(true);
    });

    test('isPlainObject(Object.create(null)) => true', () => {
        expect(isPlainObject(Object.create(null))).toBe(true);
    });
});
