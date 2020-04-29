function negate(predicate: (...args: any[]) => boolean): (...args: any[]) => boolean {
    return function (this: any, ...args: any[]) {
        return !predicate.call(this, ...args);
    };
}

export default negate;
