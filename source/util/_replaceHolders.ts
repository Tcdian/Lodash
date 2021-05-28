function _replaceHolders(partials: any[], args: any[], placeholder: any): any[] {
    let separator = 0;
    return [
        ...partials.map((partial) => {
            if (partial === placeholder) {
                return args[separator++];
            }
            return partial;
        }),
        ...args.slice(separator),
    ];
}

export { _replaceHolders };
