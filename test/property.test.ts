import { property } from '../source/util/property';

const objects = [{ a: { b: 2 } }, { a: { b: 1 } }];

test(`objects.map(property('a.b')) => ${objects.map(property('a.b'))}`, () => {
    expect(objects.map(property('a.b'))).toEqual([2, 1]);
});
