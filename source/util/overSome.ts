import { identity } from './identity';

function overSome<TS extends any[]>(predicates: ((...args: TS) => boolean)[] = [identity as any]) {
    return function (this: any, ...args: TS): boolean {
        return predicates.some((predicate) => predicate.call(this, ...args));
    };
}

export { overSome };
