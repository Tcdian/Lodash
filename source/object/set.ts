import { toPath } from '../util/toPath';
import { first } from '../array/first';
import { tail } from '../array/tail';
import { isUndefined } from '../lang/isUndefined';
import { _isIndex } from '../lang/_isIndex';

type PropertyName = string | number | symbol;

function set<T = any>(object: any, path: PropertyName | PropertyName[], value: any): T {
    const pathArr = toPath(path);
    const key = first(pathArr);
    const resPathArr = tail(pathArr);
    if (pathArr.length === 1) {
        object[key] = value;
    } else if (!isUndefined(object[key])) {
        object[key] = set(object[key], resPathArr, value);
    } else {
        object[key] = set(_isIndex(first(resPathArr)) ? [] : {}, resPathArr, value);
    }
    return object;
}

export { set };
