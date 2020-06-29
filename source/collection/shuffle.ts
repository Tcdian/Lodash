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

function shuffle<T>(collection: T[] | Dictionary<T> | NumericDictionary<T>): T[] {
    const valueArr = values(collection);
    const len = valueArr.length;
    for (let i = 0; i < len - 1; i++) {
        const randomIndex = Math.floor(Math.random() * (len - i) + i);
        swap(valueArr, i, randomIndex);
    }
    return valueArr;
}

export { shuffle };
