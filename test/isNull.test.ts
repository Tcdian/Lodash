import _ from 'lodash';
import { isNull } from '../source/lang';

test(`isNull(null) => ${isNull(null)}`, () => {
    expect(isNull(null)).toBe(_.isNull(null));
});

test(`isNull(void 0) => ${isNull(void 0)}`, () => {
    expect(isNull(void 0)).toBe(_.isNull(void 0));
});
