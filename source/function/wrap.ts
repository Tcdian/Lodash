function wrap<TFunc, TArg, TResult>(
    func: TFunc,
    wrapper: (func: TFunc, ...args: TArg[]) => TResult
): (...args: TArg[]) => TResult {
    return function (this: any, ...args: TArg[]): TResult {
        return wrapper.call(this, func, ...args);
    };
}

export { wrap };
