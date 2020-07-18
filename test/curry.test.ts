import _ from 'lodash';
import { curry } from '../source/function/curry';

function abc(a: number, b: number, c: number) {
    return [a, b, c];
}

const curried = curry(abc);
const _curried = _.curry(abc);

test(`curried(1)(2)(3) => ${curried(1)(2)(3)}`, () => {
    expect(curried(1)(2)(3)).toEqual(_curried(1)(2)(3));
});

test(`curried(1, 2)(3) => ${curried(1, 2)(3)}`, () => {
    expect(curried(1, 2)(3)).toEqual(_curried(1, 2)(3));
});

test(`curried(1, 2, 3) => ${curried(1, 2, 3)}`, () => {
    expect(curried(1, 2, 3)).toEqual(_curried(1, 2, 3));
});

test(`curried(1)(_, 3)(2) => ${curried(1)('_', 3)(2)}`, () => {
    expect(curried(1)('_', 3)(2)).toEqual(_curried(1)(_, 3)(2));
});
