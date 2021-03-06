import { get } from './get';

type PropertyName = string | number | symbol;
type PropertyPath = PropertyName | ReadonlyArray<PropertyName>;

function at<T extends object>(object: T, paths: PropertyPath[]): T[keyof T][] {
    return paths.map((path) => get(object, path));
}

export { at };
