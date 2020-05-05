function create<T extends object>(prototype: T): T;
function create<T extends object, U extends object>(prototype: T, properties: U): T & U;
function create(prototype: object, properties?: object): any {
    return Object.assign(Object.create(prototype), properties);
}

export default create;
