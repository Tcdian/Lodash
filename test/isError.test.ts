import { isError } from '../source/lang/isError';

test(`isError(new Error) => ${isError(new Error())}`, () => {
    expect(isError(new Error())).toBe(true);
});

test(`isError(Error) => ${isError(Error)}`, () => {
    expect(isError(Error)).toBe(false);
});
