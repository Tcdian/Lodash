import shuffle from '../source/shuffle';

test('shuffle([1, 2, 3, 4, 5])', () => {
    const randomArr = shuffle([1, 2, 3, 4, 5]);
    expect(randomArr).toEqual(expect.arrayContaining([1, 2, 3, 4, 5]));
    expect([1, 2, 3, 4, 5]).toEqual(expect.arrayContaining(randomArr));
});
