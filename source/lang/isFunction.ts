import { _baseGetTag } from './_baseGetTag';

function isFunction(value: any): value is (...args: any[]) => any {
    const tag = _baseGetTag(value);
    return tag === '[object Function]' || tag === '[object AsyncFunction]' || tag === '[object GeneratorFunction]';
}

export { isFunction };
