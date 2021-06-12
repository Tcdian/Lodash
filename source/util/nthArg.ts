import { nth } from '../array/nth';

type Func<TS extends any[], R> = (...args: TS) => R;

function nthArg(n = 0): Func<any[], any> {
    return function (...args: any[]): any {
        return nth(args, n);
    };
}

export { nthArg };
