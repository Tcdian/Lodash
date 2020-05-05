function create<T extends object, U extends object>(prototype: T, properties?: U): T & U {
    return Object.assign(Object.create(prototype), properties);
}

export default create;
