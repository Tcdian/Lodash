type Func = (...args: any[]) => any;

function overArgs(func: Func, transforms: Func[]): Func {
    return function (this: any, ...args: any[]) {
        return func.call(this, ...args.map((arg, index) => transforms[index].call(this, arg)));
    };
}

export { overArgs };
