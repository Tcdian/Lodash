import { flatten } from '../array/flatten';

type Func = (...args: any[]) => any;

function rearg(func: Func, ...indexes: number[][]): Func {
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
