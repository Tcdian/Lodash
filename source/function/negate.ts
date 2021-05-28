function negate<T extends (...args: any[]) => boolean>(predicate: T): T {
    return function (this: any, ...args: any[]): boolean {
        return !predicate.call(this, ...args);
    } as any as T;
}

export { negate };
