import { sampleSize } from '../source/collection/sampleSize';

describe('sampleSize', () => {
    test('sampleSize([1, 2, 3], 2)', () => {
        const randomArray = sampleSize([1, 2, 3], 2);
        expect([1, 2, 3]).toEqual(expect.arrayContaining(randomArray));
    });

    test('sampleSize([1, 2, 3], 4)', () => {
        const randomArray = sampleSize([1, 2, 3], 4);
        expect([1, 2, 3]).toEqual(expect.arrayContaining(randomArray));
        expect(randomArray).toEqual(expect.arrayContaining([1, 2, 3]));
    });
});
