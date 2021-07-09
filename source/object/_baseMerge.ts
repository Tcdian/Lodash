import { isObject } from '../lang/isObject';
import { keys } from './keys';

type PropertyName = string | number | symbol;
type MergeWithCustomizer = (
    objValue: any,
    srcValue: any,
    key: PropertyName,
    object: any,
    source: any,
    stack: any
) => any;

function _baseMerge(object: any, sources: any[], customizer?: MergeWithCustomizer, stack: Set<any> = new Set()): any {
    sources.forEach((source) => {
        keys(source).forEach((key) => {
            let finalValue = source[key];
            if (!stack.has(finalValue)) {
                stack.add(finalValue);
                const customized = customizer && customizer(object[key], source[key], key, object, source, stack);
                finalValue = customized !== undefined ? customized : finalValue;
                if (customized === undefined && isObject(object[key]) && isObject(source[key])) {
                    finalValue = _baseMerge(object[key], [source[key]], customizer, stack);
                }
                object[key] = finalValue;
                stack.delete(finalValue);
            }
        });
    });
    return object;
}

export { _baseMerge };
