function wrap<T, TS extends any[], R>(value: T, wrapper: (func: T, ...args: TS) => R): (...args: TS) => R {
    return function (this: any, ...args: TS) {
        return wrapper.call(this, value, ...args);
    };
}

export { wrap };
