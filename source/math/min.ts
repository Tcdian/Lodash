import { minBy } from './minBy';

function min<T>(array: T[]): T | undefined {
    return minBy(array);
}

export { min };
