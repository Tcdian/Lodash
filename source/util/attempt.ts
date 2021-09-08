import { isError } from '../lang/isError';

function attempt<T>(func: (...args: any[]) => T, ...args: any[]): T | Error {
    try {
        return func.call(undefined, ...args);
    } catch (error) {
        return isError(error) ? error : new Error(error as string);
    }
}

export { attempt };
