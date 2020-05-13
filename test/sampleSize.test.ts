import sampleSize from '../source/sampleSize';

test('sampleSize([1, 2, 3], 2)', () => {
    const randomArr = sampleSize([1, 2, 3], 2);
    expect([1, 2, 3]).toEqual(expect.arrayContaining(randomArr));
});

test('sampleSize([1, 2, 3], 4)', () => {
    const randomArr = sampleSize([1, 2, 3], 4);
    expect([1, 2, 3]).toEqual(expect.arrayContaining(randomArr));
    expect(randomArr).toEqual(expect.arrayContaining([1, 2, 3]));
});
