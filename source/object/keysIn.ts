function keysIn(object: any): string[] {
    const result: string[] = [];
    for (const key in object) {
        result.push(key);
    }
    return result;
}

export { keysIn };
