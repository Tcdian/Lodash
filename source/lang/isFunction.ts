import { _baseGetTag } from './_baseGetTag';

type Func<TS extends any[], R> = (...args: TS) => R;

function isFunction(value: any): value is Func<any[], any> {
    const tag = _baseGetTag(value);
    return tag === '[object Function]' || tag === '[object AsyncFunction]' || tag === '[object GeneratorFunction]';
}

export { isFunction };
