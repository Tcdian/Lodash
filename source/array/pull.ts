import { indexOf } from './indexOf';

function pull<T>(array: T[], ...values: T[]): T[] {
    values.forEach((value) => {
        let fromIndex = 0;
        while ((fromIndex = indexOf(array, value, fromIndex)) > -1) {
            array.splice(fromIndex, 1);
        }
    });
    return array;
}

export { pull };
