type Func<TResult> = (...args: any[]) => TResult;

function spread<TResult>(func: Func<TResult>, start = 0): Func<TResult> {
    return function (this: any, args: any[]) {
        return func.call(this, ...args.slice(start));
    };
}

export { spread };
