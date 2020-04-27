const ø = Object.create(null);

function defer(func: (...args: any[]) => any, ...args: any[]): number {
    return setTimeout(() => {
        return func.call(ø, ...args);
    }, 1);
}

export default defer;
