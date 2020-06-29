import _ from 'lodash';
import { lt } from '../source/lang';

test(`lt(1, 3) => ${lt(1, 3)}`, () => {
    expect(lt(1, 3)).toBe(_.lt(1, 3));
});

test(`lt(3, 3) => ${lt(3, 3)}`, () => {
    expect(lt(3, 3)).toBe(_.lt(3, 3));
});

test(`lt(3, 1) => ${lt(3, 1)}`, () => {
    expect(lt(3, 1)).toBe(_.lt(3, 1));
});
