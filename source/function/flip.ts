type Func = (...args: any[]) => any;

function flip<TFunc extends Func>(func: TFunc): TFunc {
    return function (this: any, ...args: Parameters<TFunc>): ReturnType<TFunc> {
        return func.call(this, ...args.reverse());
    } as TFunc;
}

export { flip };
