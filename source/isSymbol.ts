function isSymbol(value: any): value is symbol {
    return typeof value === 'symbol';
}

export default isSymbol;
