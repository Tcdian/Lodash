import { setWith } from './setWith';
import { get } from './get';

type PropertyName = string | number | symbol;
type Many<T> = T | T[];
type PropertyPath = Many<PropertyName>;
type SetWithCustomizer<T> = (nsValue: any, key: PropertyName, nsObject: T) => any;

function updateWith<T>(
    object: T,
    path: PropertyPath,
    updater: (value: any) => any,
    customizer?: SetWithCustomizer<T>
): any {
    return setWith(object, path, updater(get(object, path)), customizer);
}

export { updateWith };
