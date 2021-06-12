import { identity } from './identity';

function overEvery<TS extends any[]>(predicates: ((...args: TS) => boolean)[] = [identity as any]) {
    return function (this: any, ...args: TS): boolean {
        return predicates.every((predicate) => predicate.call(this, ...args));
    };
}

export { overEvery };
