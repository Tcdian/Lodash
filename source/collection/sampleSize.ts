import { values } from '../object/values';

interface Dictionary<T> {
    [index: string]: T;
}

interface NumericDictionary<T> {
    [index: number]: T;
}

function swap(array: any[], a: number, b: number) {
    const temp = array[a];
    array[a] = array[b];
    array[b] = temp;
}

function sampleSize<T>(collection: T[] | Dictionary<T> | NumericDictionary<T>, n: number = 1): T[] {
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
