import { nth } from '../array/nth';

type Func = (...args: any[]) => any;

function nthArg(n = 0): Func {
    return function (...args: any[]): any {
        return nth(args, n);
    };
}

export { nthArg };
