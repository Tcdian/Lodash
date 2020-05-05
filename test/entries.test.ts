import _ from 'lodash';
import create from '../source/create';
import entries from '../source/entries';

test(`entries(create({ a: 1 }, { b: 2 })) => ${entries(create({ a: 1 }, { b: 2 }))}`, () => {
    expect(entries(create({ a: 1 }, { b: 2 }))).toEqual(_.entries(create({ a: 1 }, { b: 2 })));
});

test(`entries(new Set([1])) => ${entries(new Set([1]))}`, () => {
    expect(entries(new Set([1]))).toEqual(_.entries(new Set([1])));
});

test(`entries(new Map([['a', 1]])) => ${entries(new Map([['a', 1]]))}`, () => {
    expect(entries(new Map([['a', 1]]))).toEqual(_.entries(new Map([['a', 1]])));
});
