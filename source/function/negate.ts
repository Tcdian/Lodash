function negate<TArgs extends any[]>(predicate: (...args: TArgs) => boolean): (...args: TArgs) => boolean {
    return function (this: any, ...args: TArgs): boolean {
        return !predicate.call(this, ...args);
    };
}

export { negate };
