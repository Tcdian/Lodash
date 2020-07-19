function constant<T>(value: T): () => T {
    return function () {
        return value;
    };
}

export { constant };
