import getAllKeys from './getAllKeys';

function getAllKeysIn(object: any): (string | symbol)[] {
    let patrol = object;
    const result: (string | symbol)[] = [];
    while (patrol !== null) {
        result.push(...getAllKeys(patrol));
        patrol = Object.getPrototypeOf(patrol);
    }
    return result;
}

export default getAllKeysIn;
