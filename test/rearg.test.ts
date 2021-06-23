import { rearg } from '../source/function/rearg';

describe('rearg', () => {
    test('rearg with [2, 0, 1]', () => {
        const rearged = rearg((a, b, c) => [a, b, c], [2, 0, 1]);
        expect(rearged('b', 'c', 'a')).toEqual(['a', 'b', 'c']);
    });
});
