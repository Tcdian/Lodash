import { take } from '../array/take';

type Func<TS extends any[], R> = (...args: TS) => R;

function ary(func: Func<any[], any>, n = func.length): Func<any[], any> {
    return function (this: any, ...args: any[]) {
        return func.call(this, ...take(args, n));
    };
}

export { ary };
