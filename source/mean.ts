function mean(array: number[]): number {
    return array.reduce((previous, current) => previous + current, 0) / array.length;
}

export default mean;
