import { take } from '../array/take';

type Func = (...args: any[]) => any;

function ary(func: Func, n = func.length): Func {
    return function (this: any, ...args: any[]) {
        return func.call(this, ...take(args, n));
    };
}

export { ary };
