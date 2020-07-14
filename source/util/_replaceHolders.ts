function _replaceHolders(partial: any[], args: any[], placeholder: any) {
    let separator = 0;
    return [
        ...partial.map((partialArg) => {
            if (partialArg === placeholder) {
                return args[separator++];
            }
            return partialArg;
        }),
        ...args.slice(separator),
    ];
}

export { _replaceHolders };
