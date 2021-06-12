type Func<TS extends any[], R> = (...args: TS) => R;
interface DebounceSettings {
    /**
     * Specify invoking on the leading edge of the timeout.
     */
    leading?: boolean;
}
interface DebouncedFunc<T extends Func<any[], any>> {
    (...args: Parameters<T>): ReturnType<T>;
    cancel(): void;
    flush(): ReturnType<T>;
}

function debounce<T extends Func<any[], any>>(
    func: T,
    wait: number,
    { leading = false }: DebounceSettings = {}
): DebouncedFunc<T> {
    let result: any;
    let timer: number | undefined;
    let lastThis: any;
    let lastArgs: any[] | undefined;

    function invokeFunc() {
        if (lastArgs !== undefined) {
            result = func.call(lastThis, ...lastArgs);
            timer = lastThis = lastArgs = undefined;
        }
        return result;
    }

    function debounced(this: any, ...args: any[]) {
        lastThis = this;
        lastArgs = args;
        if (leading && timer === undefined) {
            result = invokeFunc();
        }
        if (timer) {
            window.clearTimeout(timer);
            timer = undefined;
        }
        timer = window.setTimeout(() => {
            result = invokeFunc();
        }, wait);
        return result;
    }

    debounced.cancel = function () {
        if (timer !== undefined) {
            window.clearTimeout(timer);
        }
        timer = lastThis = lastArgs = undefined;
    };

    debounced.flush = function () {
        return timer === undefined ? result : invokeFunc();
    };

    return debounced;
}

export { debounce };
