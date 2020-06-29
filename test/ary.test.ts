import _ from 'lodash';
import { ary } from '../source/function';

test(`['6', '8', '10'].map(ary(parseInt, 1)) => ${['6', '8', '10'].map(ary(parseInt, 1))}`, () => {
    expect(['6', '8', '10'].map(ary(parseInt, 1))).toEqual(['6', '8', '10'].map(_.ary(parseInt, 1)));
});
