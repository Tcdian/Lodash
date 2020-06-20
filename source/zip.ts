function zip<T1, T2>(arr1: T1[], arr2: T2[]): [T1, T2][];
function zip<T1, T2, T3>(arr1: T1[], arr2: T2[], arr3: T3[]): [T1, T2, T3][];
function zip<T1, T2, T3, T4>(arr1: T1[], arr2: T2[], arr3: T3[], arr4: T4[]): [T1, T2, T3, T4][];
function zip<T1, T2, T3, T4, T5>(arr1: T1[], arr2: T2[], arr3: T3[], arr4: T4[], arr5: T5[]): [T1, T2, T3, T4, T5][];
function zip<T>(...arrays: T[][]): T[][];
function zip<T>(...arrays: T[][]): T[][] {
    const result: T[][] = Array.from(new Array(arrays[0].length), () => new Array(arrays.length));
    for (let i = 0; i < arrays.length; i++) {
        for (let j = 0; j < arrays[0].length; j++) {
            result[j][i] = arrays[i][j];
        }
    }
    return result;
}

export default zip;
