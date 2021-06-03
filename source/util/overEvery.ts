import { identity } from './identity';

function overEvery<TArgs extends any[]>(predicates: ((...args: TArgs) => boolean)[] = [identity as any]) {
    return function (this: any, ...args: TArgs) {
        return predicates.every((predicate) => predicate.call(this, ...args));
    };
}

export { overEvery };
