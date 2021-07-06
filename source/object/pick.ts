import { flatten } from '../array/flatten';
import { set } from './set';
import { get } from './get';
import { toPath } from '../util/toPath';

// eslint-disable-next-line @typescript-eslint/ban-types
function pick<T extends object, K extends keyof T>(object: T, ...paths: (K | K[])[]): Pick<T, K> {
    const result = {} as Pick<T, K>;
    flatten(paths).forEach((path) => {
        const formattedPath = toPath(path);
        set(result, formattedPath, get(object, formattedPath));
    });
    return result;
}

export { pick };
