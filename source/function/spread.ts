type Func<TS extends any[], R> = (...args: TS) => R;

function spread<R>(func: Func<any[], R>, start = 0): Func<any[], R> {
    return function (this: any, args: any[]) {
        return func.call(this, ...args.slice(start));
    };
}

export { spread };
