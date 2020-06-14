import drop from './drop';

function tail<T>(array: T[]): T[] {
    return drop(array, 1);
}

export default tail;
