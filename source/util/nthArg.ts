import { nth } from '../array/nth';

function nthArg(n = 0) {
    return function (this: any, ...args: any[]) {
        return nth(args, n);
    };
}

export { nthArg };
