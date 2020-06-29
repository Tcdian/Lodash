import { delay } from './delay';

function defer(func: (...args: any[]) => any, ...args: any[]): number {
    return delay(func, 0, ...args);
}

export { defer };
