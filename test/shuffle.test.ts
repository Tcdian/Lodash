import { shuffle } from '../source/collection/shuffle';

describe('shuffle', () => {
    test('shuffle([1, 2, 3, 4, 5])', () => {
        const randomArray = shuffle([1, 2, 3, 4, 5]);
        expect(randomArray).toEqual(expect.arrayContaining([1, 2, 3, 4, 5]));
        expect([1, 2, 3, 4, 5]).toEqual(expect.arrayContaining(randomArray));
    });
});
