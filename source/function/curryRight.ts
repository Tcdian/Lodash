import { _executeBound } from '../util/_executeBound';
import { _replaceHolders } from '../util/_replaceHolders';

type Func = (...args: any[]) => any;
interface CurryRight {
    <TArg, TResult>(func: (arg: TArg) => TResult, arity?: number): RightCurriedFunction1<TArg, TResult>;
    <TArg1, TArg2, TResult>(func: (arg1: TArg1, arg2: TArg2) => TResult, arity?: number): RightCurriedFunction2<
        TArg1,
        TArg2,
        TResult
    >;
    (func: Func, arity?: number): Func;
    placeholder: '_';
}
interface RightCurriedFunction1<TArg, TResult> {
    (): RightCurriedFunction1<TArg, TResult>;
    (arg: TArg): TResult;
}
interface RightCurriedFunction2<TArg1, TArg2, TResult> {
    (): RightCurriedFunction2<TArg1, TArg2, TResult>;
    (arg2: TArg2): RightCurriedFunction1<TArg1, TResult>;
    (arg1: TArg1, arg2: '_'): RightCurriedFunction1<TArg2, TResult>;
    (arg1: TArg1, arg2: TArg2): TResult;
}

const curryRight: CurryRight = function (func: Func, arity = func.length): Func {
    const placeholder = curryRight.placeholder;
    return _curryRight(func, arity, [], placeholder);
};

function _curryRight(func: Func, arity: number, partials: any[], placeholder: '_'): Func {
    return function curried(this: any, ...args: any[]) {
        const argsLen = args.filter((arg) => arg !== placeholder).length;
        const finalArgs = _replaceHolders(
            partials,
            [...new Array(arity - args.length).fill(placeholder), ...args],
            placeholder
        );
        if (argsLen >= arity) {
            return _executeBound(func, curried, this, this, finalArgs);
        } else {
            return _curryRight(func, arity - argsLen, finalArgs, placeholder);
        }
    };
}

curryRight.placeholder = '_';

export { curryRight };
