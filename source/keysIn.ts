function keysIn(object: any): string[] {
    const result: string[] = [];
    for (let key in object) {
        result.push(key);
    }
    return result;
}

export default keysIn;
