export const whereIncluded = <T extends Record<string, any>>(obj: T, mapper: Partial<{
    [K in keyof T]: (val: T[K], obj: T) => string;
}>) => {
    const filteredEntries = Object.entries(obj).filter(([_, value]) => ![undefined, null].includes(value) && value !== '');
    if (!filteredEntries.length) {
        return '';
    }
    const filteredObject = Object.fromEntries(filteredEntries) as T;

    const whereString = Object.entries(mapper).reduce((acc, [key, fn], index) => {
        if (filteredObject[key] === undefined) return acc;
        const result = fn(filteredObject[key], obj);
        acc += `${index !== 0 ? 'AND' : ''} ${result} `

        return acc;
    }, "");

    return `WHERE ${whereString}`;
}
