const ø = Object.create(null);

function delay(func: (...args: any[]) => any, wait: number, ...args: any[]): number {
    return setTimeout(() => {
        func.call(ø, ...args);
    }, wait);
}

export { delay };
