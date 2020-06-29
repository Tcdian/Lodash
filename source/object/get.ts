import { toPath } from '../util/toPath';

type PropertyName = string | number | symbol;
type PropertyPath = PropertyName | ReadonlyArray<PropertyName>;

interface Dictionary<T> {
    [index: string]: T;
}

interface NumericDictionary<T> {
    [index: number]: T;
}

function get<TObject extends object, TKey extends keyof TObject>(object: TObject, path: TKey | [TKey]): TObject[TKey];
function get<TObject extends object, TKey extends keyof TObject, TDefault>(
    object: TObject,
    path: TKey | [TKey],
    defaultValue: TDefault
): Exclude<TObject[TKey], undefined> | TDefault;
function get<TObject extends object, TKey1 extends keyof TObject, TKey2 extends keyof TObject[TKey1]>(
    object: TObject,
    path: [TKey1, TKey2]
): TObject[TKey1][TKey2];
function get<TObject extends object, TKey1 extends keyof TObject, TKey2 extends keyof TObject[TKey1], TDefault>(
    object: TObject,
    path: [TKey1, TKey2],
    defaultValue: TDefault
): Exclude<TObject[TKey1][TKey2], undefined> | TDefault;
function get<
    TObject extends object,
    TKey1 extends keyof TObject,
    TKey2 extends keyof TObject[TKey1],
    TKey3 extends keyof TObject[TKey1][TKey2]
>(object: TObject, path: [TKey1, TKey2, TKey3]): TObject[TKey1][TKey2][TKey3];
function get<
    TObject extends object,
    TKey1 extends keyof TObject,
    TKey2 extends keyof TObject[TKey1],
    TKey3 extends keyof TObject[TKey1][TKey2],
    TDefault
>(object: TObject, path: [TKey1, TKey2, TKey3]): Exclude<TObject[TKey1][TKey2][TKey3], undefined> | TDefault;
function get<T>(object: T[] | Dictionary<T> | NumericDictionary<T>, path: PropertyPath): T;
function get<T, TDefault>(
    object: T[] | Dictionary<T> | NumericDictionary<T>,
    path: PropertyPath,
    defaultValue: TDefault
): Exclude<T, undefined> | TDefault;
function get(object: any, path: PropertyPath, defaultValue?: any): any;
function get(object: any, path: PropertyPath, defaultValue?: any): any {
    if (object === undefined) {
        return defaultValue;
    }
    const pathArr = toPath(path);
    let result = object;
    for (let i = 0; i < pathArr.length; i++) {
        result = result[pathArr[i]];
        if (result === undefined) {
            return defaultValue;
        }
    }
    return result;
}

export { get };
