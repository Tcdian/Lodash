import { _executeBound } from '../util/_executeBound';
import { _replaceHolders } from '../util/_replaceHolders';

function bind<T>(func: (...args: any[]) => T, thisArg: any, ...partials: any[]): (...args: any) => T {
    const placeholder = bind.placeholder;
    return function boundFunc(this: any, ...args: any[]): any {
        const finalArgs = _replaceHolders(partials, args, placeholder);
        return _executeBound(func, boundFunc, thisArg, this, finalArgs);
    };
}

bind.placeholder = '_';

export { bind };
