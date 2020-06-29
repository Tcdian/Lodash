import { pull } from './pull';

function pullAll<T>(array: T[], values: T[]): T[] {
    return pull(array, ...values);
}

export { pullAll };
