import _ from 'lodash';
import create from '../source/create';
import entriesIn from '../source/entriesIn';

test(`entriesIn(create({ a: 1 }, { b: 2 })) => ${entriesIn(create({ a: 1 }, { b: 2 }))}`, () => {
    expect(entriesIn(create({ a: 1 }, { b: 2 }))).toEqual(_.entriesIn(create({ a: 1 }, { b: 2 })));
});

test(`entriesIn(new Set([1])) => ${entriesIn(new Set([1]))}`, () => {
    expect(entriesIn(new Set([1]))).toEqual(_.entriesIn(new Set([1])));
});

test(`entriesIn(new Map([['a', 1]])) => ${entriesIn(new Map([['a', 1]]))}`, () => {
    expect(entriesIn(new Map([['a', 1]]))).toEqual(_.entriesIn(new Map([['a', 1]])));
});
