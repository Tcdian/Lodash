type Func = (...args: any[]) => any;

function before<TFunc extends Func>(n: number, func: TFunc): TFunc {
    let result: any;
    return function (this: any, ...args: any[]): any {
        if (--n > 0) {
            result = func.call(this, ...args);
        }
        return result;
    } as any as TFunc;
}

export { before };
