import { _executeBound } from '../util/_executeBound';
import { _replaceHolders } from '../util/_replaceHolders';

function partial<TResult>(func: (...args: any[]) => TResult, ...partials: any[]): (...args: any) => TResult {
    const placeholder = partial.placeholder;
    return function boundFunc(this: any, ...args: any[]): any {
        const finalArgs = _replaceHolders(partials, args, placeholder);
        return _executeBound(func, boundFunc, this, this, finalArgs);
    };
}

partial.placeholder = '_';

export { partial };
