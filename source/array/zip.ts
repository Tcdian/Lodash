function zip<T1, T2>(arr1: T1[], arr2: T2[]): [T1, T2][];
function zip<T1, T2, T3>(arr1: T1[], arr2: T2[], arr3: T3[]): [T1, T2, T3][];
function zip<T>(...arrays: T[][]): T[][];
function zip<T>(...arrays: T[][]): T[][] {
    const len = arrays[0].length;
    const result: T[][] = Array.from(new Array(len), () => new Array(arrays.length));
    for (let i = 0; i < arrays.length; i++) {
        for (let j = 0; j < len; j++) {
            result[j][i] = arrays[i][j];
        }
    }
    return result;
}

export { zip };
