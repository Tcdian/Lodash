type Func = (...args: any[]) => any;

interface Cancelable<T> {
    cancel(): void;
    flush(): T;
}

interface DebounceSettings {
    /**
     * Specify invoking on the leading edge of the timeout.
     */
    leading?: boolean;
}

function debounce<T extends Func>(func: T, wait: number, options?: DebounceSettings): T & Cancelable<ReturnType<T>>;
function debounce(
    func: Func,
    wait: number,
    { leading = false }: DebounceSettings = {}
): Func & Cancelable<ReturnType<Func>> {
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
