import { isObject } from '../lang/isObject';
import { isUndefined } from '../lang/isUndefined';

type MergeWithCustomizer = (objValue: any, srcValue: any, key: any, object: any, source: any, stack: any) => any;

function _baseMerge(object: any, sources: any[], customizer?: MergeWithCustomizer, stack: Set<any> = new Set()): any {
    sources.forEach((source) => {
        Object.keys(source).forEach((key) => {
            let finalVal = source[key];
            if (!stack.has(finalVal)) {
                stack.add(finalVal);
                const customized = isUndefined(customizer)
                    ? undefined
                    : customizer(object[key], source[key], key, object, source, stack);
                finalVal = isUndefined(customized) ? finalVal : customized;
                if (customized === undefined && isObject(object[key]) && isObject(source[key])) {
                    finalVal = _baseMerge(object[key], [source[key]], customizer, stack);
                }
                object[key] = finalVal;
                stack.delete(finalVal);
            }
        });
    });
    return object;
}

export { _baseMerge };
