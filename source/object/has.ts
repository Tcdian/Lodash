import { toPath } from '../util/toPath';

type PropertyName = string | number | symbol;
type PropertyPath = PropertyName | ReadonlyArray<PropertyName>;

const objectProto = Object.prototype;

function has(object: any, path: PropertyPath): boolean {
    const pathArr = toPath(path);
    for (let i = 0; i < pathArr.length; i++) {
        if (!objectProto.hasOwnProperty.call(object, pathArr[i])) {
            return false;
        }
        object = object[pathArr[i]];
    }
    return true;
}

export { has };
