function delay(func: (...args: any[]) => any, wait: number, ...args: any[]): number {
    return window.setTimeout(() => {
        func.call(undefined, ...args);
    }, wait);
}

export { delay };
