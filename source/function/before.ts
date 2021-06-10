type Func = (...args: any[]) => any;

function before<TFunc extends Func>(n: number, func: TFunc): TFunc {
    let result: any;
    return function (this: any, ...args: Parameters<TFunc>): ReturnType<TFunc> {
        if (--n > 0) {
            result = func.call(this, ...args);
        }
        return result;
    } as TFunc;
}

export { before };
