import { before } from './before';

type Func<TS extends any[], R> = (...args: TS) => R;

function once<T extends Func<any[], any>>(func: T): T {
    return before(2, func);
}

export { once };
