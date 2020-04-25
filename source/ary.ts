import take from './take';
type Func = (...args: any[]) => any;

function ary(func: Func, n: number = func.length): Func {
    return function (this: any, ...args: any[]) {
        return func.call(this, ...take(args, n));
    };
}

export default ary;
