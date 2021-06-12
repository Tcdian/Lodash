import { _executeBound } from '../util/_executeBound';
import { _replaceHolders } from '../util/_replaceHolders';

type Func = (...args: any[]) => any;
interface CurryRight {
    <A, R>(func: (arg: A) => R, arity?: number): RightCurriedFunction1<A, R>;
    <A1, A2, R>(func: (arg1: A1, arg2: A2) => R, arity?: number): RightCurriedFunction2<A1, A2, R>;
    (func: Func, arity?: number): Func;
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
