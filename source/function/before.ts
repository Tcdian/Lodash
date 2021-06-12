type Func<TS extends any[], R> = (...args: TS) => R;

function before<T extends Func<any[], any>>(n: number, func: T): T {
    let result: any;
    return function (this: any, ...args: Parameters<T>): ReturnType<T> {
        if (--n > 0) {
            result = func.call(this, ...args);
        }
        return result;
    } as T;
}

export { before };
