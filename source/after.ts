type Func = (...args: any[]) => any;

function after(n: number, func: Func): Func {
    return function (this: any, ...args: any[]): any {
        if (--n <= 0) {
            return func.call(this, ...args);
        }
    };
}

export default after;
