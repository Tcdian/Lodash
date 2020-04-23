import dropRight from './dropRight';

function initial<T>(array: T[]): T[] {
    return dropRight(array);
}

export default initial;
