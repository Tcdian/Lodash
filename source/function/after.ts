type Func = (...args: any[]) => any;

function after<TFunc extends Func>(n: number, func: TFunc): TFunc {
    return function (this: any, ...args: Parameters<TFunc>): ReturnType<TFunc> | undefined {
        if (--n <= 0) {
            return func.call(this, ...args);
        }
    } as TFunc;
}

export { after };
