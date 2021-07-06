import { toPath } from '../util/toPath';

type PropertyName = string | number | symbol;
type Many<T> = T | T[];

function hasIn(object: any, path: Many<PropertyName>): boolean {
    const formattedPath = toPath(path);
    for (let i = 0; i < formattedPath.length; i++) {
        if (!(formattedPath[i] in object)) {
            return false;
        }
        object = object[formattedPath[i]];
    }
    return true;
}

export { hasIn };
