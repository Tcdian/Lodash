import { isBoolean } from '../lang/isBoolean';

function random(floating?: boolean): number;
function random(upper: number, floating?: boolean): number;
function random(lower: number, upper: number, floating?: boolean): number;
function random(lower?: number | boolean, upper?: number | boolean, floating?: boolean): number {
    if (floating === undefined) {
        if (isBoolean(upper)) {
            floating = upper;
            upper = undefined;
        } else if (isBoolean(lower)) {
            floating = lower;
            lower = undefined;
        }
    }
    if (lower === undefined && upper === undefined) {
        lower = 0;
        upper = 1;
    } else {
        upper = upper !== undefined ? upper : lower;
        lower = upper !== undefined ? lower : 0;
        if ((lower as number) > (upper as number)) {
            [lower, upper] = [upper, lower];
        }
    }
    const isFloating = floating || (upper as number) % 1 || (lower as number) % 1;
    const rand = (lower as number) + Math.floor(Math.random() * ((upper as number) - (lower as number) + 1));
    return isFloating ? rand : Math.floor(rand);
}

export { random };
