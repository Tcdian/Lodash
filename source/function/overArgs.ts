type Func = (...args: any[]) => any;

const ø = Object.create(null);

function overArgs(func: Func, transforms: Func[]): Func {
    return function (this: any, ...args: any[]) {
        return func.call(this, ...args.map((arg, index) => transforms[index].call(ø, arg)));
    };
}

export { overArgs };
