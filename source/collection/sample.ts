import { values } from '../object/values';

type PropertyName = string | number | symbol;

function sample<T>(collection: T[] | Record<PropertyName, T>): T {
    const collectionValues = values(collection);
    const random = Math.floor(Math.random() * collectionValues.length);
    return collectionValues[random];
}

export { sample };
