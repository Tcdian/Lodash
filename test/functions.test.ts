import { functions } from '../source/object/functions';
import { create } from '../source/object/create';

describe('functions', () => {
    test('functions({ b: () => {}, c: "c" }) => ["b"]', () => {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        expect(functions({ b: () => {}, c: 'c' })).toEqual(['b']);
    });
    test('functions(create({ a: () => {} }, { b: () => {}, c: "c" })) => ["b"]', () => {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        expect(functions(create({ a: () => {} }, { b: () => {}, c: 'c' }))).toEqual(['b']);
    });
});
