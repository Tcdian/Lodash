import { _executeBound } from '../util/_executeBound';
import { _replaceHolders } from '../util/_replaceHolders';

function partialRight<T>(func: (...args: any[]) => T, ...partials: any[]): (...args: any) => T {
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
