import { join } from '../source/array/join';

describe('join', () => {
    test('join(["a", "b", "c"]) => "a,b,c"', () => {
        expect(join(['a', 'b', 'c'])).toBe('a,b,c');
    });

    test('join(["a", "b", "c"], "~") => "a~b~c"', () => {
        expect(join(['a', 'b', 'c'], '~')).toBe('a~b~c');
    });
});
