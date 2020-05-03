import isEmpty from './isEmpty';

function max(array: number[]): number | undefined {
    return isEmpty(array) ? undefined : Math.max(...array);
}

export default max;
