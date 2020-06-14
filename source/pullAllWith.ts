import _ from 'lodash';
import pullAll from './pullAll';
import isUndefined from './isUndefined';

type Comparator<T> = (a: T, b: T) => boolean;

function pullAllWith<T>(array: T[], values: T[], comparator?: Comparator<T>): T[] {
    if (isUndefined(comparator)) {
        return pullAll(array, values);
    }
    values.forEach((othVal) => {
        let fromIndex = 0;
        // todo ... 更换 findIndex
        while ((fromIndex = _.findIndex(array, (arrVal) => comparator(arrVal, othVal), fromIndex)) > -1) {
            array.splice(fromIndex, 1);
        }
    });
    return array;
}

export default pullAllWith;
