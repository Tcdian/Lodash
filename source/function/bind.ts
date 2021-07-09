import { _executeBound } from './_executeBound';
import { _replaceHolders } from './_replaceHolders';

type Func<TS extends any[], R> = (...args: TS) => R;

function bind(func: Func<any[], any>, thisArg: any, ...partials: any[]): Func<any[], any> {
    const placeholder = bind.placeholder;
    return function boundFunc(this: any, ...args: any[]) {
        const finalArgs = _replaceHolders(partials, args, placeholder);
        return _executeBound(func, boundFunc, thisArg, this, finalArgs);
    };
}

bind.placeholder = '_';

export { bind };
