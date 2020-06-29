type Func = (...args: any[]) => any;

function flip<T extends Func>(func: T): T;
function flip(func: Func): Func {
    return function (this: any, ...args: any[]) {
        return func.call(this, ...args.reverse());
    };
}

export { flip };
