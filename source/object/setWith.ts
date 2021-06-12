import { set } from './set';
import { toPath } from '../util/toPath';
import { first } from '../array/first';
import { tail } from '../array/tail';
import { isEmpty } from '../lang/isEmpty';
import { isObject } from '../lang/isObject';
import { isUndefined } from '../lang/isUndefined';
import { _isIndex } from '../lang/_isIndex';

type PropertyName = string | number | symbol;
type PropertyPath = PropertyName | ReadonlyArray<PropertyName>;
type SetWithCustomizer<T> = (nsValue: any, key: PropertyName, nsObject: T) => any;

function setWith<T>(object: T, path: PropertyPath, value: any, customizer?: SetWithCustomizer<T>): any {
    if (isUndefined(customizer)) {
        return set(object, path, value);
    }
    const pathArr = toPath(path);
    const key = first(pathArr);
    if (!isUndefined(key)) {
        const resPathArr = tail(pathArr);
        if (isEmpty(resPathArr)) {
            (object as any)[key] = value;
        } else {
            const objectVal = (object as any)[key];
            let newVal = customizer(objectVal, key, object);
            if (isUndefined(newVal)) {
                newVal = isObject(objectVal) ? objectVal : _isIndex(first(resPathArr)) ? [] : {};
            }
            (object as any)[key] = setWith(newVal, resPathArr, value, customizer);
        }
    }
    return object;
}

export { setWith };
