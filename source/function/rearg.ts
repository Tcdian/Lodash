import { flatten } from '../array/flatten';

type Func<TS extends any[], R> = (...args: TS) => R;

function rearg(func: Func<any[], any>, ...indexes: number[][]): Func<any[], any> {
    const reIndexes = flatten(indexes);
    return function (this: any, ...args: any[]) {
        const finalArgs = new Array(args.length);
        reIndexes.forEach((reIndex, i) => {
            finalArgs[i] = args[reIndex];
        });
        return func.call(this, ...finalArgs);
    };
}

export { rearg };
