function overEvery<TArgs extends any[]>(iteratees: ((...args: TArgs) => boolean)[]) {
    return function (this: any, ...args: TArgs) {
        return iteratees.every((iteratee) => iteratee.call(this, ...args));
    };
}

export { overEvery };
