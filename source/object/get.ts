/* eslint-disable @typescript-eslint/ban-types */
import { toPath } from '../util/toPath';

type PropertyName = string | number | symbol;
type PropertyPath = PropertyName | PropertyName[];

function get<T extends object, K extends keyof T>(object: T, path: K | [K]): T[K];
function get<T extends object, K extends keyof T, Default>(
    object: T,
    path: K | [K],
    defaultValue: Default
): Exclude<T[K], undefined> | Default;
function get<T extends object, K1 extends keyof T, K2 extends keyof T[K1]>(object: T, path: [K1, K2]): T[K1][K2];
function get<T extends object, K1 extends keyof T, K2 extends keyof T[K1], Default>(
    object: T,
    path: [K1, K2],
    defaultValue: Default
): Exclude<T[K1][K2], undefined> | Default;
function get<K extends PropertyName, V>(object: Record<K, V>, path: PropertyPath): V;
function get<K extends PropertyName, V, Default>(
    object: Record<K, V>,
    path: PropertyPath,
    defaultValue: Default
): Exclude<V, undefined> | Default;
function get(object: any, path: PropertyPath, defaultValue?: any): any;
function get(object: any, path: PropertyPath, defaultValue?: any): any {
    if (object === undefined) {
        return defaultValue;
    }
    const formattedPath = toPath(path);
    let result = object;
    for (let i = 0; i < formattedPath.length; i++) {
        result = result[formattedPath[i]];
        if (result === undefined) {
            return defaultValue;
        }
    }
    return result;
}

export { get };
