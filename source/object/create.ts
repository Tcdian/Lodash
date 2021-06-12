import { assign } from './assign';

// eslint-disable-next-line @typescript-eslint/ban-types
function create<Prototype extends object, Properties extends object>(
    prototype: Prototype,
    properties?: Properties
): Prototype & Properties {
    return assign(Object.create(prototype), properties);
}

export { create };
