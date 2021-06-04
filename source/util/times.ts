import { identity } from './identity';

function times<TResult>(n: number, iteratee: (index: number) => TResult = identity as any): TResult[] {
    return Array.from(new Array(n), (v, i) => iteratee(i));
}

export { times };
