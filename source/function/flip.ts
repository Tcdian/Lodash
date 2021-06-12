type Func<TS extends any[], R> = (...args: TS) => R;

function flip<T extends Func<any[], any>>(func: T): T {
    return function (this: any, ...args: Parameters<T>): ReturnType<T> {
        return func.call(this, ...args.reverse());
    } as T;
}

export { flip };
