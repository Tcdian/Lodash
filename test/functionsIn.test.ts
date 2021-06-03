import { functionsIn } from '../source/object/functionsIn';
import { create } from '../source/object/create';

describe('functionsIn', () => {
    test('functionsIn(create({ a: () => {} }, { b: () => {}, c: "c" })) => ["b", "a"]', () => {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        expect(functionsIn(create({ a: () => {} }, { b: () => {}, c: 'c' }))).toEqual(['b', 'a']);
    });
});
