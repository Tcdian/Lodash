import { isUndefined } from '../lang/isUndefined';

function cond<T, R>(pairs: [(value: T) => boolean, (value: T) => R][]): (value: T) => R | undefined {
    return function (this: any, value: T): R | undefined {
        const target = pairs.find((pair) => pair[0].call(this, value));
        if (!isUndefined(target)) {
            return target[1].call(this, value);
        }
    };
}

export { cond };
