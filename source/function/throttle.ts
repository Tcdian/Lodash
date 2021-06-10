import { now } from '../date/now';

type Func = (...args: any[]) => any;
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
interface ThrottledFunc<TFunc extends Func> {
    (...args: Parameters<TFunc>): ReturnType<TFunc>;
    cancel(): void;
    flush(): ReturnType<TFunc>;
}

function throttle<TFunc extends Func>(
    func: TFunc,
    wait: number,
    { leading = true, trailing = true }: ThrottleSettings = {}
): ThrottledFunc<TFunc> {
    let result: any;
    let timer: number | undefined;
    let lastInvokeTime = 0;
    let lastThis: any;
    let lastArgs: any[] | undefined;

    function invokeFunc(time: number) {
        if (lastArgs !== undefined) {
            result = func.call(lastThis, ...lastArgs);
            lastInvokeTime = time;
            timer = lastThis = lastArgs = undefined;
        }
        return result;
    }

    function throttled(this: any, ...args: any) {
        const time = now();
        lastThis = this;
        lastArgs = args;
        if (!leading && lastInvokeTime === 0) {
            lastInvokeTime = time;
        }

        const remaining = wait - (time - lastInvokeTime);
        if (remaining <= 0 || remaining > wait) {
            if (timer) {
                window.clearTimeout(timer);
                timer = undefined;
            }
            result = invokeFunc(time);
        } else if (trailing && timer === undefined) {
            timer = window.setTimeout(() => {
                result = invokeFunc(leading ? now() : 0);
            }, remaining);
        }
        return result;
    }

    throttled.cancel = function () {
        if (timer !== undefined) {
            window.clearTimeout(timer);
        }
        timer = lastThis = lastArgs = undefined;
        lastInvokeTime = 0;
    };

    throttled.flush = function () {
        return timer === undefined ? result : invokeFunc(leading ? now() : 0);
    };

    return throttled;
}

export { throttle };
