type Func = (...args: any[]) => any;

interface Cancelable<T> {
    cancel(): void;
    flush(): T;
}

interface ThrottleSettings {
    /**
     * If you'd like to disable the leading-edge call, pass this as false.
     */
    leading?: boolean;

    /**
     * If you'd like to disable the execution on the trailing-edge, pass false.
     */
    trailing?: boolean;
}

function throttle<T extends Func>(func: T, wait: number, options?: ThrottleSettings): T & Cancelable<ReturnType<T>>;
function throttle(
    func: Func,
    wait: number,
    { leading = true, trailing = true }: ThrottleSettings = {}
): Func & Cancelable<ReturnType<Func>> {
    let result: any;
    let timer: number | undefined;
    let lastInvokeTime = 0;
    let lastThis: any;
    let lastArgs: any[] | undefined;

    function throttled(this: any, ...args: any) {
        const time = Date.now();
        lastThis = this;
        lastArgs = args;
        if (!leading && lastInvokeTime === 0) {
            lastInvokeTime = time;
        }

        const remaining = wait - (time - lastInvokeTime);
        if (remaining <= 0 || remaining > wait) {
            if (timer) {
                clearTimeout(timer);
                timer = undefined;
            }
            result = invokeFunc(time);
        } else if (trailing && !timer) {
            timer = setTimeout(() => {
                if (!leading) {
                    lastInvokeTime = 0;
                }
                result = invokeFunc();
            }, remaining);
        }
    }

    function invokeFunc(time: number = Date.now()) {
        if (lastArgs !== undefined) {
            result = func.call(lastThis, ...lastArgs);
        }
        lastInvokeTime = time;
        timer = lastThis = lastArgs = undefined;
        return result;
    }

    throttled.cancel = function () {
        clearTimeout(timer);
        timer = lastThis = lastArgs = undefined;
        lastInvokeTime = 0;
    };

    throttled.flush = function () {
        return trailing ? invokeFunc(Date.now()) : result;
    };

    return throttled;
}

export default throttle;
