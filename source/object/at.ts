import { get } from './get';
import { flatten } from '../array/flatten';

type PropertyName = string | number | symbol;
type Many<T> = T | T[];
type PropertyPath = Many<PropertyName>;

function at<T>(object: Record<PropertyName, T>, ...paths: PropertyPath[]): T[] {
    return flatten(paths).map((path) => get(object, path));
}

export { at };
