import { _executeBound } from './_executeBound';
import { _replaceHolders } from './_replaceHolders';

type Func<TS extends any[], R> = (...args: TS) => R;
interface CurryRight {
    <A, R>(func: (arg: A) => R, arity?: number): RightCurriedFunction1<A, R>;
    <A1, A2, R>(func: (arg1: A1, arg2: A2) => R, arity?: number): RightCurriedFunction2<A1, A2, R>;
    (func: Func<any[], any>, arity?: number): Func<any[], any>;
    placeholder: '_';
}
interface RightCurriedFunction1<A, R> {
    (): RightCurriedFunction1<A, R>;
    (arg: A): R;
}
interface RightCurriedFunction2<A1, A2, R> {
    (): RightCurriedFunction2<A1, A2, R>;
    (arg2: A2): RightCurriedFunction1<A1, R>;
    (arg1: A1, arg2: '_'): RightCurriedFunction1<A2, R>;
    (arg1: A1, arg2: A2): R;
}

const curryRight: CurryRight = function (func: Func<any[], any>, arity = func.length): Func<any[], any> {
    const placeholder = curryRight.placeholder;
    return _curryRight(func, arity, [], placeholder);
};

function _curryRight(func: Func<any[], any>, arity: number, partials: any[], placeholder: '_'): Func<any[], any> {
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
