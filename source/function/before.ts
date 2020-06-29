type Func = (...args: any[]) => any;

function before<T extends Func>(n: number, func: T): T;
function before(n: number, func: Func): Func {
    let result: any;
    return function (this: any, ...args: any[]): any {
        if (--n > 0) {
            result = func.call(this, ...args);
        }
        return result;
    };
}

export { before };
