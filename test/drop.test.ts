import _ from 'lodash';
import drop from '../source/drop';

test(`drop([1, 2, 3]) => ${drop([1, 2, 3])}`, () => {
    expect(drop([1, 2, 3])).toEqual(_.drop([1, 2, 3]));
});

test(`drop([1, 2, 3], 2) => ${drop([1, 2, 3], 2)}`, () => {
    expect(drop([1, 2, 3], 2)).toEqual(_.drop([1, 2, 3], 2));
});

test(`drop([1, 2, 3], 5) => ${drop([1, 2, 3], 5)}`, () => {
    expect(drop([1, 2, 3], 5)).toEqual(_.drop([1, 2, 3], 5));
});

test(`drop([1, 2, 3], 0) => ${drop([1, 2, 3], 0)}`, () => {
    expect(drop([1, 2, 3], 0)).toEqual(_.drop([1, 2, 3], 0));
});
