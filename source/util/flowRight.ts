import { first } from '../array/first';

function flowRight<R1, R2>(func2: (arg: R1) => R2, func1: (...args: any[]) => R1): (...args: any) => R2;
function flowRight<R1, R2, R3>(
    func3: (arg: R2) => R3,
    func2: (arg: R1) => R2,
    func1: (...args: any[]) => R1
): (...args: any) => R3;
function flowRight<R1, R2, R3, R4>(
    func4: (arg: R3) => R4,
    func3: (arg: R2) => R3,
    func2: (arg: R1) => R2,
    func1: (...args: any[]) => R1
): (...args: any) => R4;
function flowRight<R1, R2, R3, R4, R5>(
    func5: (arg: R4) => R5,
    func4: (arg: R3) => R4,
    func3: (arg: R2) => R3,
    func2: (arg: R1) => R2,
    func1: (...args: any[]) => R1
): (...args: any) => R5;
function flowRight<R1, R2, R3, R4, R5, R6>(
    func6: (arg: R5) => R6,
    func5: (arg: R4) => R5,
    func4: (arg: R3) => R4,
    func3: (arg: R2) => R3,
    func2: (arg: R1) => R2,
    func1: (...args: any[]) => R1
): (...args: any) => R6;
function flowRight(...funcs: ((...args: any[]) => any)[]): (...args: any) => any;
function flowRight(...funcs: ((...args: any[]) => any)[]): (...args: any) => any {
    return function (this: any, ...args: any[]): any {
        return first(funcs.reduceRight((previousR, func) => [func.call(this, ...previousR)], args));
    };
}

export { flowRight };
