import { join } from '../source/array/join';

test(`join(['a', 'b', 'c'], '~') => ${join(['a', 'b', 'c'], '~')}`, () => {
    expect(join(['a', 'b', 'c'], '~')).toBe('a~b~c');
});
