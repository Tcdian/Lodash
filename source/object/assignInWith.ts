import { last } from '../array/last';
import { initial } from '../array/initial';
import { isFunction } from '../lang/isFunction';
import { isUndefined } from '../lang/isUndefined';
import { assign } from '../object/assign';

type AssignCustomizer<TObject, TSource> = (
    objValue: TObject[keyof TObject],
    srcValue: TSource[keyof TSource],
    key?: keyof TObject,
    object?: TObject,
    source?: TSource
) => any;

function assignInWith<TObject, TSource>(
    object: TObject,
    source: TSource,
    customizer: AssignCustomizer<TObject, TSource>
): TObject & TSource;
function assignInWith<TObject, TSource1, TSource2>(
    object: TObject,
    source1: TSource1,
    source2: TSource2,
    customizer: AssignCustomizer<TObject, TSource1 & TSource2>
): TObject & TSource1 & TSource2;
function assignInWith<TObject, TSource1, TSource2, TSource3>(
    object: TObject,
    source1: TSource1,
    source2: TSource2,
    source3: TSource3,
    customizer: AssignCustomizer<TObject, TSource1 & TSource2 & TSource3>
): TObject & TSource1 & TSource2 & TSource3;
function assignInWith(object: any, ...otherArgs: any[]): any;
function assignInWith(object: any, ...otherArgs: any[]): any {
    const customizer: AssignCustomizer<any, any> = last(otherArgs);
    if (!isFunction(customizer)) {
        return assign(object, ...otherArgs);
    }
    const sources = initial(otherArgs);
    sources.forEach((source) => {
        for (const key in source) {
            const customized = customizer(object[key], source[key], key, object, source);
            object[key] = isUndefined(customized) ? source[key] : customized;
        }
    });
    return object;
}

export { assignInWith };
