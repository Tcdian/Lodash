import uniq from './uniq';
import flatten from './flatten';

function xor<T>(...arrays: T[][]): T[] {
    const uniqedArrays = arrays.map((array) => uniq(array));
    const flatedArray = flatten<T>(uniqedArrays);
    const cache = new Map<T, number>();
    for (let i = 0; i < flatedArray.length; i++) {
        cache.set(flatedArray[i], (cache.get(flatedArray[i]) || 0) + 1);
    }
    return flatedArray.filter((value) => cache.get(value) === 1);
}

export default xor;
