type Func = (...args: any[]) => any;

function flip<T extends Func>(func: T): T {
    return function (this: any, ...args: any[]) {
        return func.call(this, ...args.reverse());
    } as any as T;
}

export { flip };
