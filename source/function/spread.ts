type Func<R> = (...args: any[]) => R;

function spread<R>(func: Func<R>, start = 0): Func<R> {
    return function (this: any, args: any[]) {
        return func.call(this, ...args.slice(start));
    };
}

export { spread };
