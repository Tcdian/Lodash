import { _getAllKeysIn } from './_getAllKeysIn';

function toPlainObject(value: any): any {
    const allKeys = _getAllKeysIn(value);
    const result = {};
    allKeys.forEach((key) => {
        Object.assign(result, { [key]: value[key] });
    });
    return result;
}

export { toPlainObject };
