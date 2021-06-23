import { identity } from '../source/util/identity';

describe('identity', () => {
    test('return first argument', () => {
        const object = { a: 1 };
        expect(identity(object)).toBe(object);
    });
});
