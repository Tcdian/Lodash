let id = 0;

function uniqueId(prefix = '') {
    return `${prefix}${id++}`;
}

export { uniqueId };
