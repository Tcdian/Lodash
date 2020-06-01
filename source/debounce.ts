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

    function debounced(this: any, ...args: any[]) {
        lastThis = this;
        lastArgs = args;
        if (leading && timer === undefined) {
            result = invokeFunc();
        }
        if (timer) {
            clearTimeout(timer);
            timer = undefined;
        }
        timer = setTimeout(() => {
            result = invokeFunc();
        }, wait);
        return result;
    }

    function invokeFunc() {
        if (lastArgs !== undefined) {
            result = func.call(lastThis, ...lastArgs);
            timer = lastThis = lastArgs = undefined;
        }
        return result;
    }

    debounced.cancel = function () {
        if (timer !== undefined) {
            clearTimeout(timer);
        }
        timer = lastThis = lastArgs = undefined;
    };

    debounced.flush = function () {
        return timer === undefined ? result : invokeFunc();
    };

    return debounced;
}

export default debounce;
