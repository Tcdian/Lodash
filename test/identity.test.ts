import { identity } from '../source/util/identity';

test('identity', () => {
    const object = { a: 1 };
    expect(identity(object)).toBe(object);
});
