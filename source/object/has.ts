import { toPath } from '../util/toPath';

type PropertyName = string | number | symbol;
type PropertyPath = PropertyName | PropertyName[];

function has(object: any, path: PropertyPath): boolean {
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
