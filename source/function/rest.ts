type Func<TS extends any[], R> = (...args: TS) => R;

function rest(func: Func<any[], any>, start = func.length - 1): Func<any[], any> {
    return function (this: any, ...args: any[]) {
        return func.call(this, ...args.slice(0, start), args.slice(start));
    };
}

export { rest };
