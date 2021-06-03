import { property } from '../source/util/property';

describe('property', () => {
    test('objects.map(property("a.b")) => [2, 1]', () => {
        const objects = [{ a: { b: 2 } }, { a: { b: 1 } }];
        expect(objects.map(property('a.b'))).toEqual([2, 1]);
    });
});
