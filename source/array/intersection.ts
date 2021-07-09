import { first } from './first';
import { tail } from './tail';

function intersection<T>(...arrays: T[][]): T[] {
    const firstArray = first(arrays);
    const otherArrays = tail(arrays);
    if (firstArray === undefined) {
        return [];
    }
    return firstArray.filter((value, index) => {
        return firstArray.indexOf(value) === index && otherArrays.every((otherArray) => otherArray.includes(value));
    });
}

export { intersection };
