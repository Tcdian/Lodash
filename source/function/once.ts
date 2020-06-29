import { before } from './before';

type Func = (...args: any[]) => any;

function once<T extends Func>(func: T): T {
    return before(2, func);
}

export { once };
