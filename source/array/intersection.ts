import { first } from './first';
import { tail } from './tail';
import { isUndefined } from '../lang/isUndefined';

function intersection<T>(...arrays: T[][]): T[] {
    const firstArray = first(arrays);
    const otherArrays = tail(arrays);
    if (isUndefined(firstArray)) {
        return [];
    }
    return firstArray.filter((value, index) => {
        return firstArray.indexOf(value) === index && otherArrays.every((otherArray) => otherArray.includes(value));
    });
}

export { intersection };
