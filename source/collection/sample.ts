import { values } from '../object/values';

type PropertyName = string | number | symbol;

function sample<T>(collection: T[] | Record<PropertyName, T>): T {
    const valueArr = values(collection);
    const random = Math.floor(Math.random() * valueArr.length);
    return valueArr[random];
}

export { sample };
