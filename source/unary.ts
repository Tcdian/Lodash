import ary from './ary';

type Func = (...args: any[]) => any;

function unary(func: Func): Func {
    return ary(func, 1);
}

export default unary;
