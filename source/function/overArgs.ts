import { flatten } from '../array/flatten';

type Func = (...args: any[]) => any;

function overArgs(func: Func, ...transforms: (Func | Func[])[]): Func {
    const transformFuncs = flatten(transforms);
    return function (this: any, ...args: any[]) {
        return func.call(this, ...args.map((arg, index) => transformFuncs[index].call(this, arg)));
    };
}

export { overArgs };
