import { identity } from './identity';

function times<R>(n: number, iteratee: (index: number) => R = identity as any): R[] {
    return Array.from(new Array(n), (_deprecated, index) => iteratee(index));
}

export { times };
