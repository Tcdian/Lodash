import { toPath } from '../util/toPath';
import { first } from '../array/first';
import { tail } from '../array/tail';
import { isObject } from '../lang/isObject';
import { isEmpty } from '../lang/isEmpty';
import { isUndefined } from '../lang/isUndefined';
import { _isIndex } from '../lang/_isIndex';

type PropertyName = string | number | symbol;
type PropertyPath = PropertyName | ReadonlyArray<PropertyName>;

function set(object: any, path: PropertyPath, value: any): any {
    const pathArr = toPath(path);
    const key = first(pathArr);
    if (!isUndefined(key)) {
        const resPathArr = tail(pathArr);
        if (isEmpty(resPathArr)) {
            object[key] = value;
        } else if (isObject(object[key])) {
            object[key] = set(object[key], resPathArr, value);
        } else {
            object[key] = set(_isIndex(first(resPathArr)) ? [] : {}, resPathArr, value);
        }
    }
    return object;
}

export { set };
