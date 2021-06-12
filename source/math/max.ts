import { maxBy } from './maxBy';

function max<T>(array: T[]): T | undefined {
    return maxBy(array);
}

export { max };
