import { _executeBound } from '../util/_executeBound';
import { _replaceHolders } from '../util/_replaceHolders';

type Func<TS extends any[], R> = (...args: TS) => R;

function bindKey(object: any, key: string, ...partials: any[]): Func<any[], any> {
    const placeholder = bindKey.placeholder;
    return function boundFunc(this: any, ...args: any[]) {
        const finalArgs = _replaceHolders(partials, args, placeholder);
        return _executeBound(object[key], boundFunc, object, this, finalArgs);
    };
}

bindKey.placeholder = '_';

export { bindKey };
