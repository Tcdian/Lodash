import { _executeBound } from '../util/_executeBound';
import { _replaceHolders } from '../util/_replaceHolders';

function partialRight<TResult>(func: (...args: any[]) => TResult, ...partials: any[]): (...args: any) => TResult {
    const placeholder = partialRight.placeholder;
    return function boundFunc(this: any, ...args: any[]): any {
        const finalArgs = _replaceHolders(
            [...new Array(func.length - partials.length).fill(placeholder), ...partials],
            args,
            placeholder
        );
        return _executeBound(func, boundFunc, this, this, finalArgs);
    };
}

partialRight.placeholder = '_';

export { partialRight };
