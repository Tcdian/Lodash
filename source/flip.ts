type Func = (...args: any[]) => any;

function flip<TFunc extends Func>(func: TFunc): TFunc;
function flip(func: Func): Func {
    return function (this: any, ...args: any[]) {
        return func.call(this, ...args.reverse());
    };
}

export default flip;
