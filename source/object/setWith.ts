import { toPath } from '../util/toPath';
import { first } from '../array/first';
import { tail } from '../array/tail';
import { isEmpty } from '../lang/isEmpty';
import { isObject } from '../lang/isObject';
import { isUndefined } from '../lang/isUndefined';
import { _isIndex } from '../lang/_isIndex';

type PropertyName = string | number | symbol;
type Many<T> = T | T[];
type PropertyPath = Many<PropertyName>;
type SetWithCustomizer<T> = (nsValue: any, key: PropertyName, nsObject: T) => any;

function setWith<T>(object: T, path: PropertyPath, value: any, customizer?: SetWithCustomizer<T>): any {
    const formattedPath = toPath(path);
    const key = first(formattedPath);
    if (!isUndefined(key)) {
        const resPathArr = tail(formattedPath);
        if (isEmpty(resPathArr)) {
            (object as any)[key] = value;
        } else {
            const objectVal = (object as any)[key];
            let newVal = customizer && customizer(objectVal, key, object);
            if (isUndefined(newVal)) {
                newVal = isObject(objectVal) ? objectVal : _isIndex(first(resPathArr)) ? [] : {};
            }
            (object as any)[key] = setWith(newVal, resPathArr, value, customizer);
        }
    }
    return object;
}

export { setWith };
