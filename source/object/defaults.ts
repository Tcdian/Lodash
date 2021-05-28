function defaults<TObject, TSource>(object: TObject, source: TSource): TObject & TSource;
function defaults<TObject, TSource1, TSource2>(
    object: TObject,
    source1: TSource1,
    source2: TSource2
): TObject & TSource1 & TSource2;
function defaults<TObject, TSource1, TSource2, TSource3>(
    object: TObject,
    source1: TSource1,
    source2: TSource2,
    source3: TSource3
): TObject & TSource1 & TSource2 & TSource3;
function defaults(object: any, ...sources: any[]): any {
    return Object.assign(object, ...sources.reverse(), { ...object });
}

export { defaults };
