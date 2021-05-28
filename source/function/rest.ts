type Func = (...args: any[]) => any;

function rest(func: Func, start = func.length - 1): Func {
    return function (this: any, ...args: any[]): any {
        return func.call(this, ...args.slice(0, start), args.slice(start));
    };
}

export { rest };
