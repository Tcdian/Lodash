function spread<TR>(func: (...args: any[]) => TR, start: number = 0): (...args: any[]) => TR {
    return function (this: any, args: any[]) {
        return func.call(this, ...args.slice(start));
    };
}

export { spread };
