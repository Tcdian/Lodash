import tail from './tail';

function intersection<T>(...arrays: T[][]): T[] {
    const firstArray = arrays[0];
    const otherArrays = tail(arrays);
    return firstArray.filter((value, index) => {
        return firstArray.indexOf(value) === index && otherArrays.every((otherArray) => otherArray.includes(value));
    });
}

export default intersection;
