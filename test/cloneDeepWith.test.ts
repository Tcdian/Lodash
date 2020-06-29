import _ from 'lodash';
import { cloneDeepWith, isNumber } from '../source/lang';

function square(value: any) {
    if (isNumber(value)) {
        return Math.pow(value, 2);
    }
}

test("cloneDeepWith([ { a: 1, [Symbol('a')]: 1 }, { b: 2, [Symbol('b')]: 2 } ])", () => {
    const objects = [
        { a: 1, [Symbol('a')]: 1 },
        { b: 2, [Symbol('b')]: 2 },
    ];

    const shallow = cloneDeepWith(objects, square);
    expect(shallow).toEqual(_.cloneDeepWith(objects, square));
});

test('cloneDeepWith(new Set([ { a: 1, b: 1 }, { a: 2, b: 2 } ]))', () => {
    const set = new Set([
        { a: 1, b: 1 },
        { a: 2, b: 2 },
    ]);
    const shallow = cloneDeepWith(set, square);
    expect(shallow).toEqual(_.cloneDeepWith(set, square));
});
