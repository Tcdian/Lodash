import { identity } from './identity';

function overEvery<As extends any[]>(predicates: ((...args: As) => boolean)[] = [identity as any]) {
    return function (this: any, ...args: As): boolean {
        return predicates.every((predicate) => predicate.call(this, ...args));
    };
}

export { overEvery };
