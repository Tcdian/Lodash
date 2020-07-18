import { _executeBound } from '../util/_executeBound';
import { _replaceHolders } from '../util/_replaceHolders';

type Func = (...args: any[]) => any;

function curry(func: Func, arity = func.length): Func {
    const placeholder = curry.placeholder;
    return _curry(func, arity, [], placeholder);
}

function _curry(func: Func, arity: number, partials: any[], placeholder: any): Func {
    return function curried(this: any, ...args: any[]): any {
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
