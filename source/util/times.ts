import { identity } from './identity';

function times<R>(n: number, iteratee: (index: number) => R = identity as any): R[] {
    return Array.from(new Array(n), (v, i) => iteratee(i));
}

export { times };
