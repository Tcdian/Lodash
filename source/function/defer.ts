import { delay } from './delay';

type Func<TS extends any[], R> = (...args: TS) => R;

function defer(func: Func<any[], any>, ...args: any[]): number {
    return delay(func, 0, ...args);
}

export { defer };
