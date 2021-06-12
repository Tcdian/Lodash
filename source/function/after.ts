type Func<TS extends any[], R> = (...args: TS) => R;

function after<T extends Func<any[], any>>(n: number, func: T): T {
    return function (this: any, ...args: Parameters<T>): ReturnType<T> | undefined {
        if (--n <= 0) {
            return func.call(this, ...args);
        }
    } as T;
}

export { after };
