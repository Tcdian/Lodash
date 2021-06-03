import { identity } from './identity';

function overSome<TArgs extends any[]>(predicates: ((...args: TArgs) => boolean)[] = [identity as any]) {
    return function (this: any, ...args: TArgs) {
        return predicates.some((predicate) => predicate.call(this, ...args));
    };
}

export { overSome };
