import { assign } from './assign';

// eslint-disable-next-line @typescript-eslint/ban-types
function create<T extends object, U extends object>(prototype: T, properties?: U): T & U {
    return assign(Object.create(prototype), properties);
}

export { create };
