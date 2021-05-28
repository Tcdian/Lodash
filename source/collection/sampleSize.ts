import { values } from '../object/values';

type PropertyName = string | number | symbol;

function swap(array: unknown[], a: number, b: number) {
    const temp = array[a];
    array[a] = array[b];
    array[b] = temp;
}

function sampleSize<T>(collection: T[] | Record<PropertyName, T>, n = 1): T[] {
    const valueArr = values(collection);
    const len = valueArr.length;
    n = Math.min(len, n);
    for (let i = 0; i < n; i++) {
        const randomIndex = Math.floor(Math.random() * (len - i) + i);
        swap(valueArr, i, randomIndex);
    }
    return valueArr.slice(0, n);
}

export { sampleSize };
