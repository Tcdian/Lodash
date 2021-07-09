import { last } from '../array/last';
import { initial } from '../array/initial';
import { isFunction } from '../lang/isFunction';
import { keys } from './keys';

type AssignCustomizer<T, Source> = (
    objValue: T[keyof T],
    srcValue: Source[keyof Source],
    key: keyof T,
    object: T,
    source: Source
) => any;

function assignWith<T, Source>(object: T, source: Source, customizer: AssignCustomizer<T, Source>): T & Source;
function assignWith<T, Source1, Source2>(
    object: T,
    source1: Source1,
    source2: Source2,
    customizer: AssignCustomizer<T, Source1 & Source2>
): T & Source1 & Source2;
function assignWith(object: any, ...otherArgs: any[]): any;
function assignWith(object: any, ...otherArgs: any[]): any {
    const customizer: AssignCustomizer<any, any> = last(otherArgs);
    if (!isFunction(customizer)) {
        return Object.assign(object, ...otherArgs);
    }
    const sources = initial(otherArgs);
    sources.forEach((source) => {
        keys(source).forEach((key) => {
            const customized = customizer(object[key], source[key], key, object, source);
            object[key] = customized !== undefined ? customized : source[key];
        });
    });
    return object;
}

export { assignWith };
