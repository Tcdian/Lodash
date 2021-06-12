function over<As extends any[], TResult>(iteratees: ((...args: As) => TResult)[]) {
    return function (this: any, ...args: As): TResult[] {
        return iteratees.map((iteratee) => iteratee.call(this, ...args));
    };
}

export { over };
