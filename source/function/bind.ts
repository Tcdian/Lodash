import { _executeBound } from '../util/_executeBound';
import { _replaceHolders } from '../util/_replaceHolders';

type Func = (...args: any[]) => any;

function bind(func: Func, thisArg: any, ...partials: any[]): Func {
    const placeholder = bind.placeholder;
    return function boundFunc(this: any, ...args: any[]) {
        const finalArgs = _replaceHolders(partials, args, placeholder);
        return _executeBound(func, boundFunc, thisArg, this, finalArgs);
    };
}

bind.placeholder = '_';

export { bind };
