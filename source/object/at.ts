import { get } from './get';
import { flatten } from '../array/flatten';

type PropertyName = string | number | symbol;
type Many<T> = T | T[];

function at<T>(object: Record<PropertyName, T>, ...paths: Many<PropertyName>[]): T[] {
    return flatten(paths).map((path) => get(object, path));
}

export { at };
