function wrap<TFunc, TArg extends any[], TResult>(
    func: TFunc,
    wrapper: (func: TFunc, ...args: TArg) => TResult
): (...args: TArg) => TResult {
    return function (this: any, ...args: TArg) {
        return wrapper.call(this, func, ...args);
    };
}

export { wrap };
