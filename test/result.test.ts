import { result } from '../source/object/result';
import { constant } from '../source/util/constant';

describe('result', () => {
    const object = { a: [{ b: { c1: 3, c2: constant(4) } }] };

    test('resolved value', () => {
        expect(result(object, 'a[0].b.c1')).toBe(3);
    });

    test('resolved function', () => {
        expect(result(object, 'a[0].b.c2')).toBe(4);
    });

    test('resolve default', () => {
        expect(result(object, 'a[0].b.c3', 'default')).toBe('default');
    });

    test('resolved default function', () => {
        expect(result(object, 'a[0].b.c3', constant('constant default'))).toBe('constant default');
    });
});
