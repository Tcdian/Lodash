type Func = (...args: any[]) => any;

function before<TFunc extends Func>(n: number, func: TFunc): TFunc;
function before(n: number, func: Func): Func {
    let result: any;
    return function (this: any, ...args: any[]): any {
        if (--n > 0) {
            result = func.call(this, ...args);
        }
        return result;
    };
}

export default before;
