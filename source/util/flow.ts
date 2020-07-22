function flow<R1, R2>(func1: (...args: any[]) => R1, func2: (arg: R1) => R2): (...args: any[]) => R2;
function flow<R1, R2, R3>(
    func1: (...args: any[]) => R1,
    func2: (arg: R1) => R2,
    func3: (arg: R2) => R3
): (...args: any[]) => R3;
function flow<R1, R2, R3, R4>(
    func1: (...args: any[]) => R1,
    func2: (arg: R1) => R2,
    func3: (arg: R2) => R3,
    func4: (arg: R3) => R4
): (...args: any[]) => R4;
function flow<R1, R2, R3, R4, R5>(
    func1: (...args: any[]) => R1,
    func2: (arg: R1) => R2,
    func3: (arg: R2) => R3,
    func4: (arg: R3) => R4,
    func5: (arg: R4) => R5
): (...args: any[]) => R5;
function flow<R1, R2, R3, R4, R5, R6>(
    func1: (...args: any[]) => R1,
    func2: (arg: R1) => R2,
    func3: (arg: R2) => R3,
    func4: (arg: R3) => R4,
    func5: (arg: R4) => R5,
    func6: (arg: R5) => R6
): (...args: any[]) => R6;
function flow(func1: (...args: any[]) => any, ...funcs: ((arg: any) => any)[]): (...args: any[]) => any;
function flow(func1: (...args: any[]) => any, ...funcs: ((arg: any) => any)[]): (...args: any[]) => any {
    return function (this: any, ...args: any[]): any {
        return funcs.reduce((previousR, func) => func.call(this, previousR), func1.call(this, ...args));
    };
}

export { flow };
