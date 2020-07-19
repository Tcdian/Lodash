import { get } from '../object/get';
import { set } from '../object/set';
import { bind } from '../function/bind';

function bindAll<T>(object: T, ...methodNames: (string | string[])[]): T {
    methodNames.forEach((methodName) => {
        const method = get(object, methodName);
        set(object, methodName, bind(method, object));
    });
    return object;
}

export { bindAll };
