type Func = (...args: any[]) => any;

function after<TFunc extends Func>(n: number, func: TFunc): TFunc {
    return function (this: any, ...args: any[]): any {
        if (--n <= 0) {
            return func.call(this, ...args);
        }
    } as any as TFunc;
}

export { after };
