import _ from 'lodash';
import gte from '../source/gte';

test(`gte(3, 1) => ${gte(3, 1)}`, () => {
    expect(gte(3, 1)).toBe(_.gte(3, 1));
});

test(`gte(3, 3) => ${gte(3, 3)}`, () => {
    expect(gte(3, 3)).toBe(_.gte(3, 3));
});

test(`gte(1, 3) => ${gte(1, 3)}`, () => {
    expect(gte(1, 3)).toBe(_.gte(1, 3));
});
