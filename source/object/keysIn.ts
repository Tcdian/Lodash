function keysIn(object: object): string[] {
    const result: string[] = [];
    for (let key in object) {
        result.push(key);
    }
    return result;
}

export { keysIn };
