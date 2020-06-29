import { flatten } from './flatten';
import { uniq } from './uniq';

function union<T>(...arrays: T[][]): T[] {
    return uniq(flatten<T>(arrays));
}

export { union };
