import { flatten } from '../array/flatten';

type Func<TS extends any[], R> = (...args: TS) => R;

function overArgs(func: Func<any[], any>, ...transforms: (Func<any[], any> | Func<any[], any>[])[]): Func<any[], any> {
    const transformFuncs = flatten(transforms);
    return function (this: any, ...args: any[]) {
        return func.call(this, ...args.map((arg, index) => transformFuncs[index].call(this, arg)));
    };
}

export { overArgs };
