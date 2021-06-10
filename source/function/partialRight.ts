import { _executeBound } from '../util/_executeBound';
import { _replaceHolders } from '../util/_replaceHolders';

type Func<TResult> = (...args: any[]) => TResult;
type Func0<TResult> = () => TResult;
type Func1<TArg, TResult> = (arg: TArg) => TResult;
type Func2<TArg1, TArg2, TResult> = (arg1: TArg1, arg2: TArg2) => TResult;
type Func3<TArg1, TArg2, TArg3, TResult> = (arg1: TArg1, arg2: TArg2, arg3: TArg3) => TResult;

interface PartialRight {
    <TArg, TResult>(func: Func1<TArg, TResult>, arg: TArg): Func0<TResult>;
    <TArg1, TArg2, TResult>(func: Func2<TArg1, TArg2, TResult>, arg2: TArg2): Func1<TArg1, TResult>;
    <TArg1, TArg2, TResult>(func: Func2<TArg1, TArg2, TResult>, arg1: TArg1, placeholder2: '_'): Func1<TArg2, TResult>;
    <TArg1, TArg2, TResult>(func: Func2<TArg1, TArg2, TResult>, arg1: TArg1, arg2: TArg2): Func0<TResult>;
    <TArg1, TArg2, TArg3, TResult>(
        func: Func3<TArg1, TArg2, TArg3, TResult>,
        arg1: TArg1,
        placeholder2: '_',
        placeholder3: '_'
    ): Func2<TArg2, TArg3, TResult>;
    <TArg1, TArg2, TArg3, TResult>(func: Func3<TArg1, TArg2, TArg3, TResult>, arg2: TArg2, placeholder3: '_'): Func2<
        TArg1,
        TArg3,
        TResult
    >;
    <TArg1, TArg2, TArg3, TResult>(func: Func3<TArg1, TArg2, TArg3, TResult>, arg3: TArg3): Func2<
        TArg1,
        TArg2,
        TResult
    >;
    <TArg1, TArg2, TArg3, TResult>(
        func: Func3<TArg1, TArg2, TArg3, TResult>,
        arg1: TArg1,
        arg2: TArg2,
        placeholder3: '_'
    ): Func1<TArg3, TResult>;
    <TArg1, TArg2, TArg3, TResult>(
        func: Func3<TArg1, TArg2, TArg3, TResult>,
        arg1: TArg1,
        placeholder2: '_',
        arg3: TArg3
    ): Func1<TArg2, TResult>;
    <TArg1, TArg2, TArg3, TResult>(func: Func3<TArg1, TArg2, TArg3, TResult>, arg2: TArg2, arg3: TArg3): Func1<
        TArg1,
        TResult
    >;
    <TArg1, TArg2, TArg3, TResult>(
        func: Func3<TArg1, TArg2, TArg3, TResult>,
        arg1: TArg1,
        arg2: TArg2,
        arg3: TArg3
    ): Func0<TResult>;
    <TResult>(func: Func<TResult>, ...partials: any[]): TResult;
    placeholder: '_';
}

const partialRight: PartialRight = function partialRight<TResult>(
    func: Func<TResult>,
    ...partials: any[]
): Func<TResult> {
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
