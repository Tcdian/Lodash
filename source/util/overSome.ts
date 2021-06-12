import { identity } from './identity';

function overSome<As extends any[]>(predicates: ((...args: As) => boolean)[] = [identity as any]) {
    return function (this: any, ...args: As): boolean {
        return predicates.some((predicate) => predicate.call(this, ...args));
    };
}

export { overSome };
