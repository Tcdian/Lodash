function capitalize(string: string): string {
    return string[0].toUpperCase() + string.slice(1).toLocaleLowerCase();
}

export default capitalize;
