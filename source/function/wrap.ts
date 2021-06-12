function wrap<TFunc, A extends any[], R>(func: TFunc, wrapper: (func: TFunc, ...args: A) => R): (...args: A) => R {
    return function (this: any, ...args: A) {
        return wrapper.call(this, func, ...args);
    };
}

export { wrap };
