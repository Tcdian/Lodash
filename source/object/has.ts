import { toPath } from '../util/toPath';

type PropertyName = string | number | symbol;
type Many<T> = T | T[];

function has(object: any, path: Many<PropertyName>): boolean {
    const formattedPath = toPath(path);
    for (let i = 0; i < formattedPath.length; i++) {
        if (!Object.prototype.hasOwnProperty.call(object, formattedPath[i])) {
            return false;
        }
        object = object[formattedPath[i]];
    }
    return true;
}

export { has };
