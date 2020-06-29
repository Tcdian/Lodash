import { _baseMerge } from './_baseMerge';

function merge<TObject, TSource>(object: TObject, source: TSource): TObject & TSource;
function merge<TObject, TSource1, TSource2>(
    object: TObject,
    source1: TSource1,
    source2: TSource2
): TObject & TSource1 & TSource2;
function merge<TObject, TSource1, TSource2, TSource3>(
    object: TObject,
    source1: TSource1,
    source2: TSource2,
    source3: TSource3
): TObject & TSource1 & TSource2 & TSource3;
function merge(object: any, ...sources: any[]): any;
function merge(object: any, ...sources: any[]): any {
    return _baseMerge(object, sources);
}

export { merge };
