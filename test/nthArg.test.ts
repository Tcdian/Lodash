import { nthArg } from '../source/util/nthArg';

test('nthArg', () => {
    const func = nthArg(1);
    expect(func('a', 'b', 'c', 'd')).toBe('b');
});

test('nthArg with n is negative', () => {
    const func = nthArg(-2);
    expect(func('a', 'b', 'c', 'd')).toBe('c');
});
