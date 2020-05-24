import keys from './keys';

function getAllKeys(object: any): (string | symbol)[] {
    return [...keys(object), ...Object.getOwnPropertySymbols(object)];
}

export default getAllKeys;
