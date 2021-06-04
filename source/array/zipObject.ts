type PropertyName = string | number | symbol;

function zipObject<K extends PropertyName, V>(props: K[] = [], values: V[] = []): Record<K, V> {
    const result = {} as Record<K, V>;
    props.forEach((prop, index) => {
        Object.assign(result, { [prop]: values[index] });
    });
    return result;
}

export { zipObject };
