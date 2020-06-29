import { values } from '../object/values';

interface Dictionary<T> {
    [index: string]: T;
}

interface NumericDictionary<T> {
    [index: number]: T;
}

function sample<T>(collection: T[] | Dictionary<T> | NumericDictionary<T>): T {
    const valueArr = values(collection);
    const random = Math.floor(Math.random() * valueArr.length);
    return valueArr[random];
}

export { sample };
