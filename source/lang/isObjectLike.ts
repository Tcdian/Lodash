function isObjectLike(value: any): boolean {
    return value !== null && typeof value === 'object';
}

export { isObjectLike };
