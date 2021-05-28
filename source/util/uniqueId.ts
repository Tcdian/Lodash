let id = 0;

function uniqueId(prefix = ''): string {
    return `${prefix}${id++}`;
}

export { uniqueId };
