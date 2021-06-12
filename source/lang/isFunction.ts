import { _baseGetTag } from './_baseGetTag';

type Func<A extends any[], R> = (...args: A) => R;

function isFunction(value: any): value is Func<any[], any> {
    const tag = _baseGetTag(value);
    return tag === '[object Function]' || tag === '[object AsyncFunction]' || tag === '[object GeneratorFunction]';
}

export { isFunction };
