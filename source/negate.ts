function negate<T extends (...args: any[]) => boolean>(predicate: T): T;
function negate(predicate: (...args: any[]) => boolean): (...args: any[]) => boolean {
    return function (this: any, ...args: any[]): boolean {
        return !predicate.call(this, ...args);
    };
}

export default negate;
