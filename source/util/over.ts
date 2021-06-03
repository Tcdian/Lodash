function over<TArgs extends any[], TResult>(iteratees: ((...args: TArgs) => TResult)[]) {
    return function (this: any, ...args: TArgs): TResult[] {
        return iteratees.map((iteratee) => iteratee.call(this, ...args));
    };
}

export { over };
