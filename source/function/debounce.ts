type Func = (...args: any[]) => any;
interface DebounceSettings {
    /**
     * Specify invoking on the leading edge of the timeout.
     */
    leading?: boolean;
}
interface DebouncedFunc<TFunc extends Func> {
    (...args: Parameters<TFunc>): ReturnType<TFunc>;
    cancel(): void;
    flush(): ReturnType<TFunc>;
}

function debounce<TFunc extends Func>(
    func: TFunc,
    wait: number,
    { leading = false }: DebounceSettings = {}
): DebouncedFunc<TFunc> {
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
