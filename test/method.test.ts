import { method } from '../source/util/method';
import { constant } from '../source/util/constant';

const objects = [{ a: { b: constant(2) } }, { a: { b: constant(1) } }];

test(`objects.map(method('a.b')) => ${objects.map(method('a.b'))}`, () => {
    expect(objects.map(method('a.b'))).toEqual([2, 1]);
});

test(`objects.map(method(['a', 'b'])) => ${objects.map(method(['a', 'b']))}`, () => {
    expect(objects.map(method(['a', 'b']))).toEqual([2, 1]);
});
