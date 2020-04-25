import zip from './zip';

function unzip<T>(array: T[][]): T[][] {
    return zip(...array);
}

export default unzip;
