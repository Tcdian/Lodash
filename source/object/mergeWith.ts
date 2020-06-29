import { _baseMerge } from './_baseMerge';
import { last } from '../array/last';
import { initial } from '../array/initial';
import { isFunction } from '../lang/isFunction';

type MergeWithCustomizer = (objValue: any, srcValue: any, key: string | symbol, object: any, source: any) => any;

function mergeWith<TObject, TSource>(
    object: TObject,
    source: TSource,
    customizer: MergeWithCustomizer
): TObject & TSource;
function mergeWith<TObject, TSource1, TSource2>(
    object: TObject,
    source1: TSource1,
    source2: TSource2,
    customizer: MergeWithCustomizer
): TObject & TSource1 & TSource2;
function mergeWith<TObject, TSource1, TSource2, TSource3>(
    object: TObject,
    source1: TSource1,
    source2: TSource2,
    source3: TSource3,
    customizer: MergeWithCustomizer
): TObject & TSource1 & TSource2 & TSource3;
function mergeWith(object: any, ...resArgs: any[]): any;
function mergeWith(object: any, ...resArgs: any[]): any {
    const customizer: MergeWithCustomizer = last(resArgs);
    if (isFunction(customizer)) {
        return _baseMerge(object, initial(resArgs), customizer);
    }
    return _baseMerge(object, resArgs);
}

export { mergeWith };
