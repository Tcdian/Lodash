import { _executeBound } from '../util/_executeBound';
import { _replaceHolders } from '../util/_replaceHolders';

type Func = (...args: any[]) => any;

function curryRight(func: Func, arity = func.length): Func {
    const placeholder = curryRight.placeholder;
    return _curryRight(func, arity, [], placeholder);
}

function _curryRight(func: Func, arity: number, partials: any[], placeholder: any): Func {
    return function curried(this: any, ...args: any[]): any {
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
