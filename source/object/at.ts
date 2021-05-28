import { get } from './get';

type PropertyName = string | number | symbol;
type PropertyPath = PropertyName | ReadonlyArray<PropertyName>;

function at<T>(object: Record<PropertyName, T>, paths: PropertyPath[]): T[] {
    return paths.map((path) => get(object, path));
}

export { at };
