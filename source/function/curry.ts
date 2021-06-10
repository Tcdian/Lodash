import { _executeBound } from '../util/_executeBound';
import { _replaceHolders } from '../util/_replaceHolders';

type Func = (...args: any[]) => any;
interface Curry {
    <TArg, TResult>(func: (arg: TArg) => TResult, arity?: number): CurriedFunction1<TArg, TResult>;
    <TArg1, TArg2, TResult>(func: (arg1: TArg1, arg2: TArg2) => TResult, arity?: number): CurriedFunction2<
        TArg1,
        TArg2,
        TResult
    >;
    (func: Func, arity?: number): Func;
    placeholder: '_';
}
interface CurriedFunction1<TArg, TResult> {
    (): CurriedFunction1<TArg, TResult>;
    (arg: TArg): TResult;
}
interface CurriedFunction2<TArg1, TArg2, TResult> {
    (): CurriedFunction2<TArg1, TArg2, TResult>;
    (arg1: TArg1): CurriedFunction1<TArg2, TResult>;
    (arg1: '_', arg2: TArg2): CurriedFunction1<TArg1, TResult>;
    (args1: TArg1, arg2: TArg2): TResult;
}

const curry: Curry = function (func: Func, arity = func.length): Func {
    const placeholder = curry.placeholder;
    return _curry(func, arity, [], placeholder);
};

function _curry(func: Func, arity: number, partials: any[], placeholder: '_'): Func {
    return function curried(this: any, ...args: any[]) {
        const argsLen = args.filter((arg) => arg !== placeholder).length;
        const finalArgs = _replaceHolders(partials, args, placeholder);
        if (argsLen >= arity) {
            return _executeBound(func, curried, this, this, finalArgs);
        } else {
            return _curry(func, arity - argsLen, finalArgs, placeholder);
        }
    };
}

curry.placeholder = '_';

export { curry };
