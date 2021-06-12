function over<TS extends any[], R>(iteratees: ((...args: TS) => R)[]) {
    return function (this: any, ...args: TS): R[] {
        return iteratees.map((iteratee) => iteratee.call(this, ...args));
    };
}

export { over };
