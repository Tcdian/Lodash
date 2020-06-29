function eq(value: any, other: any): boolean {
    return value === other || (Number.isNaN(value) && Number.isNaN(other));
}

export { eq };
