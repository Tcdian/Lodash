import { _executeBound } from './_executeBound';
import { _replaceHolders } from './_replaceHolders';

type Func<TS extends any[], R> = (...args: TS) => R;
type Func0<R> = () => R;
type Func1<A, R> = (arg: A) => R;
type Func2<A1, A2, R> = (arg1: A1, arg2: A2) => R;
type Func3<A1, A2, A3, R> = (arg1: A1, arg2: A2, arg3: A3) => R;

interface PartialRight {
    <A, R>(func: Func1<A, R>, arg: A): Func0<R>;
    <A1, A2, R>(func: Func2<A1, A2, R>, arg2: A2): Func1<A1, R>;
    <A1, A2, R>(func: Func2<A1, A2, R>, arg1: A1, placeholder2: '_'): Func1<A2, R>;
    <A1, A2, R>(func: Func2<A1, A2, R>, arg1: A1, arg2: A2): Func0<R>;
    <A1, A2, A3, R>(func: Func3<A1, A2, A3, R>, arg1: A1, placeholder2: '_', placeholder3: '_'): Func2<A2, A3, R>;
    <A1, A2, A3, R>(func: Func3<A1, A2, A3, R>, arg2: A2, placeholder3: '_'): Func2<A1, A3, R>;
    <A1, A2, A3, R>(func: Func3<A1, A2, A3, R>, arg3: A3): Func2<A1, A2, R>;
    <A1, A2, A3, R>(func: Func3<A1, A2, A3, R>, arg1: A1, arg2: A2, placeholder3: '_'): Func1<A3, R>;
    <A1, A2, A3, R>(func: Func3<A1, A2, A3, R>, arg1: A1, placeholder2: '_', arg3: A3): Func1<A2, R>;
    <A1, A2, A3, R>(func: Func3<A1, A2, A3, R>, arg2: A2, arg3: A3): Func1<A1, R>;
    <A1, A2, A3, R>(func: Func3<A1, A2, A3, R>, arg1: A1, arg2: A2, arg3: A3): Func0<R>;
    <R>(func: Func<any[], R>, ...partials: any[]): R;
    placeholder: '_';
}

const partialRight: PartialRight = function partialRight<R>(func: Func<any[], R>, ...partials: any[]): Func<any[], R> {
    const placeholder = partialRight.placeholder;
    return function boundFunc(this: any, ...args: any[]) {
        const finalArgs = _replaceHolders(
            [...new Array(func.length - partials.length).fill(placeholder), ...partials],
            args,
            placeholder
        );
        return _executeBound(func, boundFunc, this, this, finalArgs);
    };
};

partialRight.placeholder = '_';

export { partialRight };
