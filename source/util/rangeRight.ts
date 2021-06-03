import { range } from './range';

function rangeRight(end: number): number[];
function rangeRight(start: number, end: number): number[];
function rangeRight(start: number, end: number, step: number): number[];
function rangeRight(start: number, end?: number, step?: number): number[];
function rangeRight(start: number, end?: number, step?: number): number[] {
    return range(start, end, step).reverse();
}

export { rangeRight };
