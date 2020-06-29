import _ from 'lodash';
import { isError } from '../source/lang';

test(`isError(new Error) => ${isError(new Error())}`, () => {
    expect(isError(new Error())).toBe(_.isError(new Error()));
});

test(`isError(Error) => ${isError(Error)}`, () => {
    expect(isError(Error)).toBe(_.isError(Error));
});
