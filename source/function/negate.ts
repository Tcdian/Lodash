type Func<A extends any[], R> = (...args: A) => R;

function negate<A extends any[]>(predicate: Func<A, boolean>): Func<A, boolean> {
    return function (this: any, ...args: A) {
        return !predicate.call(this, ...args);
    };
}

export { negate };
