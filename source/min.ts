import isEmpty from './isEmpty';

function min<T>(array: T[]): T | undefined {
    if (isEmpty(array)) {
        return undefined;
    }
    return array.reduce((previous, current) => (previous < current ? previous : current));
}

export default min;
