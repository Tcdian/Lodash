import { ary } from './ary';

type Func<TS extends any[], R> = (...args: TS) => R;

function unary(func: Func<any[], any>): Func<any[], any> {
    return ary(func, 1);
}

export { unary };
