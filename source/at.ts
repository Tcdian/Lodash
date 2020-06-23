import get from './get';

type PropertyName = string | number | symbol;
type PropertyPath = PropertyName | PropertyName[];

function at<T extends object>(object: T, paths: PropertyPath[]): T[keyof T][] {
    return paths.map((path) => get(object, path));
}

export default at;
