import { delay } from './delay';

type Func = (...args: any[]) => any;

function defer(func: Func, ...args: any[]): number {
    return delay(func, 0, ...args);
}

export { defer };
