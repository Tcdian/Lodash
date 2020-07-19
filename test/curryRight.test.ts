import { curryRight } from '../source/function/curryRight';

function abc(a: number, b: number, c: number) {
    return [a, b, c];
}

const curried = curryRight(abc);

test(`curried(3)(2)(1) => ${curried(3)(2)(1)}`, () => {
    expect(curried(3)(2)(1)).toEqual([1, 2, 3]);
});

test(`curried(2, 3)(1) => ${curried(2, 3)(1)}`, () => {
    expect(curried(2, 3)(1)).toEqual([1, 2, 3]);
});

test(`curried(1, 2, 3) => ${curried(1, 2, 3)}`, () => {
    expect(curried(1, 2, 3)).toEqual([1, 2, 3]);
});

test(`curried(3)(1, '_')(2) => ${curried(3)(1, '_')(2)}`, () => {
    expect(curried(3)(1, '_')(2)).toEqual([1, 2, 3]);
});
