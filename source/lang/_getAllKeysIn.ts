import { _getAllKeys } from './_getAllKeys';

function _getAllKeysIn(object: any): (string | symbol)[] {
    let patrol = object;
    const result: (string | symbol)[] = [];
    while (patrol !== null) {
        result.push(..._getAllKeys(patrol));
        patrol = Object.getPrototypeOf(patrol);
    }
    return result;
}

export { _getAllKeysIn };
