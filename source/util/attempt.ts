import { isError } from '../lang/isError';

const ø = Object.create(null);

function attempt<T>(func: (...args: any[]) => T, ...args: any[]): T | Error {
    try {
        return func.call(ø, ...args);
    } catch (error) {
        return isError(error) ? error : new Error(error);
    }
}

export { attempt };
