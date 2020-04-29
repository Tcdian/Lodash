type Func = (...args: any[]) => any;

function rearg(func: Func, indexes: number[]): Func {
    return function (this: any, ...args: any[]): any {
        const finalArgs = new Array(args.length);
        indexes.forEach((index, i) => {
            finalArgs[i] = args[index];
        });
        return func.call(this, ...finalArgs);
    };
}

export default rearg;
