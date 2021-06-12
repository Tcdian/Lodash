type Func<TS extends any[], R> = (...args: TS) => R;

function negate<TS extends any[]>(predicate: Func<TS, boolean>): Func<TS, boolean> {
    return function (this: any, ...args: TS) {
        return !predicate.call(this, ...args);
    };
}

export { negate };
