import { ary } from '../source/function/ary';

test(`['6', '8', '10'].map(ary(parseInt, 1)) => ${['6', '8', '10'].map(ary(parseInt, 1))}`, () => {
    expect(['6', '8', '10'].map(ary(parseInt, 1))).toEqual([6, 8, 10]);
});
