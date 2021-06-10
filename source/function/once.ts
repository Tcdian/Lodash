import { before } from './before';

type Func = (...args: any[]) => any;

function once<TFunc extends Func>(func: TFunc): TFunc {
    return before(2, func);
}

export { once };
