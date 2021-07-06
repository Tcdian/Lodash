import { flatten } from '../array/flatten';
import { _baseClone } from '../lang/_baseClone';
import { unset } from './unset';
import { isPlainObject } from '../lang/isPlainObject';
import { toPath } from '../util/toPath';

// eslint-disable-next-line @typescript-eslint/ban-types
function omit<T extends object, K extends keyof T>(object: T, ...paths: (K | K[])[]): Omit<T, K> {
    let isDeep = false;
    const formattedPaths = flatten(paths).map((path) => {
        const formattedPath = toPath(path);
        isDeep = isDeep || formattedPath.length > 1;
        return formattedPath;
    });
    const CLONE_DEEP_FLAG = isDeep ? 1 : 0;
    const CLONE_FLAT_FLAG = 1 << 1;
    const CLONE_SYMBOLS_FLAG = 1 << 2;
    const result = _baseClone(object, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, (value) =>
        isPlainObject(value) ? undefined : value
    );
    formattedPaths.forEach((path) => {
        unset(result, path);
    });
    return result;
}

export { omit };
