type Func<TS extends any[], R> = (...args: TS) => R;

function delay(func: Func<any[], any>, wait: number, ...args: any[]): number {
    return setTimeout(() => {
        func.call(undefined, ...args);
    }, wait);
}

export { delay };
