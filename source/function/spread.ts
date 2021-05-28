function spread<TResult>(func: (...args: any[]) => TResult, start = 0): (...args: any[]) => TResult {
    return function (this: any, args: any[]) {
        return func.call(this, ...args.slice(start));
    };
}

export { spread };
