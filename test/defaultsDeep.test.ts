import _ from 'lodash';
import { defaultsDeep } from '../source/object/defaultsDeep';

describe('defaultsDeep', () => {
    interface Recursive {
        a?: Recursive;
        id: string;
    }

    const object = { a: { b: 2 } };
    const other = { a: { b: 1, c: 3 } };

    test('defaultsDeep objects', () => {
        expect(defaultsDeep(object, other)).toEqual({ a: { b: 2, c: 3 } });
    });

    test('defaultsDeep recursive', () => {
        const recursiveA: Recursive = { id: 'a' };
        recursiveA.a = recursiveA;
        const recursiveB: Recursive = { id: 'b' };
        recursiveB.a = recursiveB;
        // 参照物
        const recursiveAR: Recursive = { id: 'a' };
        recursiveAR.a = recursiveAR;
        const recursiveBR: Recursive = { id: 'b' };
        recursiveBR.a = recursiveBR;
        expect(defaultsDeep(recursiveA, recursiveB)).toEqual(_.defaultsDeep(recursiveAR, recursiveBR));
    });
});
