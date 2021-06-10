type Func = (...args: any[]) => any;

function delay(func: Func, wait: number, ...args: any[]): number {
    return window.setTimeout(() => {
        func.call(undefined, ...args);
    }, wait);
}

export { delay };
