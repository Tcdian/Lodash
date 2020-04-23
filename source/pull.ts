function pull<T>(array: T[], ...values: T[]): T[] {
    values.forEach((value) => {
        let fromIndex = 0;
        while ((fromIndex = array.indexOf(value, fromIndex)) > -1) {
            array.splice(fromIndex, 1);
        }
    });
    return array;
}

export default pull;
