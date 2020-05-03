function mean(array: number[]): number {
    return array.reduce((previous, current) => previous + current) / array.length;
}

export default mean;
