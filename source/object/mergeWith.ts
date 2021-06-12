import { _baseMerge } from './_baseMerge';
import { last } from '../array/last';
import { initial } from '../array/initial';
import { isFunction } from '../lang/isFunction';

type MergeWithCustomizer = (objValue: any, srcValue: any, key: any, object: any, source: any) => any;

function mergeWith<T, Source>(object: T, source: Source, customizer: MergeWithCustomizer): T & Source;
function mergeWith<T, Source1, Source2>(
    object: T,
    source1: Source1,
    source2: Source2,
    customizer: MergeWithCustomizer
): T & Source1 & Source2;
function mergeWith(object: any, ...resArgs: any[]): any;
function mergeWith(object: any, ...resArgs: any[]): any {
    const customizer: MergeWithCustomizer = last(resArgs);
    if (isFunction(customizer)) {
        return _baseMerge(object, initial(resArgs), customizer);
    }
    return _baseMerge(object, resArgs);
}

export { mergeWith };
