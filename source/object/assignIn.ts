function assignIn<TObject, TSource>(object: TObject, source: TSource): TObject & TSource;
function assignIn<TObject, TSource1, TSource2>(
    object: TObject,
    source1: TSource1,
    source2: TSource2
): TObject & TSource1 & TSource2;
function assignIn<TObject, TSource1, TSource2, TSource3>(
    object: TObject,
    source1: TSource1,
    source2: TSource2,
    source3: TSource3
): TObject & TSource1 & TSource2 & TSource3;
function assignIn<TObject>(object: any, ...sources: any[]): TObject;
function assignIn(object: any, ...sources: any[]): any {
    sources.forEach((source) => {
        for (const key in source) {
            object[key] = source[key];
        }
    });
    return object;
}

export { assignIn };
