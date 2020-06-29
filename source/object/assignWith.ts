import { last } from '../array/last';
import { initial } from '../array/initial';
import { isFunction } from '../lang/isFunction';
import { isUndefined } from '../lang/isUndefined';

type AssignCustomizer<TObject, TSource> = (
    objValue: TObject[keyof TObject],
    srcValue: TSource[keyof TSource],
    key?: keyof TObject,
    object?: TObject,
    source?: TSource
) => any;

function assignWith<TObject, TSource>(
    object: TObject,
    source: TSource,
    customizer: AssignCustomizer<TObject, TSource>
): TObject & TSource;
function assignWith<TObject, TSource1, TSource2>(
    object: TObject,
    source1: TSource1,
    source2: TSource2,
    customizer: AssignCustomizer<TObject, TSource1 & TSource2>
): TObject & TSource1 & TSource2;
function assignWith<TObject, TSource1, TSource2, TSource3>(
    object: TObject,
    source1: TSource1,
    source2: TSource2,
    source3: TSource3,
    customizer: AssignCustomizer<TObject, TSource1 & TSource2 & TSource3>
): TObject & TSource1 & TSource2 & TSource3;
function assignWith(object: any, ...otherArgs: any[]): any;
function assignWith(object: any, ...otherArgs: any[]): any {
    const customizer: AssignCustomizer<any, any> = last(otherArgs);
    if (!isFunction(customizer)) {
        return Object.assign(object, ...otherArgs);
    }
    const sources = initial(otherArgs);
    sources.forEach((source) => {
        Object.keys(source).forEach((key) => {
            const customized = customizer(object[key], source[key], key, object, source);
            object[key] = isUndefined(customized) ? source[key] : customized;
        });
    });
    return object;
}

export { assignWith };
