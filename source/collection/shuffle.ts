import { values } from '../object/values';

function swap(array: unknown[], a: number, b: number) {
    const temp = array[a];
    array[a] = array[b];
    array[b] = temp;
}

function shuffle<T>(collection: T[]): T[] {
    const collectionValues = values(collection);
    const len = collectionValues.length;
    for (let i = 0; i < len - 1; i++) {
        const randomIndex = Math.floor(Math.random() * (len - i) + i);
        swap(collectionValues, i, randomIndex);
    }
    return collectionValues;
}

export { shuffle };
