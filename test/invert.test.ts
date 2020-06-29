import _ from 'lodash';
import { invert } from '../source/array';

test(`invert({ a: 1, b: 2, c: 1 }) => ${invert({ a: 1, b: 2, c: 1 })}`, () => {
    expect(invert({ a: 1, b: 2, c: 1 })).toEqual(_.invert({ a: 1, b: 2, c: 1 }));
});
