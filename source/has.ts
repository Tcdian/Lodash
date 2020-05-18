import toPath from './toPath';

type PropertyName = string | number | symbol;
type PropertyPath = PropertyName | ReadonlyArray<PropertyName>;

interface Dictionary<T> {
    [index: string]: T;
}

interface NumericDictionary<T> {
    [index: number]: T;
}

function has(object: Dictionary<any> | NumericDictionary<any>, path: PropertyPath): boolean {}
