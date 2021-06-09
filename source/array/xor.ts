import { uniq } from './uniq';
import { flatten } from './flatten';

function xor<T>(...arrays: T[][]): T[] {
    const uniqedArrays = arrays.map((array) => uniq(array));
    const flattened = flatten<T>(uniqedArrays);
    const cache = new Map<T, number>();
    for (let i = 0; i < flattened.length; i++) {
        cache.set(flattened[i], (cache.get(flattened[i]) || 0) + 1);
    }
    return flattened.filter((value) => cache.get(value) === 1);
}

export { xor };
