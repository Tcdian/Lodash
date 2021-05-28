import { set } from './set';
import { toPath } from '../util/toPath';
import { first } from '../array/first';
import { tail } from '../array/tail';
import { isEmpty } from '../lang/isEmpty';
import { isObject } from '../lang/isObject';
import { isUndefined } from '../lang/isUndefined';
import { _isIndex } from '../lang/_isIndex';

type PropertyName = string | number | symbol;
type Func = (...args: any[]) => any;

function setWith(object: any, path: PropertyName | PropertyName[], value: any, customizer?: Func): any {
    if (isUndefined(customizer)) {
        return set(object, path, value);
    }
    const pathArr = toPath(path);
    const key = first(pathArr);
    const resPathArr = tail(pathArr);
    if (isEmpty(resPathArr)) {
        object[key] = value;
    } else {
        const objectVal = object[key];
        let newVal = customizer(objectVal, key, object);
        if (isUndefined(newVal)) {
            newVal = isObject(objectVal) ? objectVal : _isIndex(first(resPathArr)) ? [] : {};
        }
        object[key] = setWith(newVal, resPathArr, value, customizer);
    }
    return object;
}

export { setWith };
