export const whereIncluded = <T extends Record<string, any>>(obj: T, mapper: Partial<{
    [K in keyof T]: (val: T[K], obj: T, initialTableAlias: string) => string;
}>, initialTableAlias: string) => {
    const filteredEntries = Object.entries(obj).filter(([_, value]) => ![undefined, null].includes(value) && value !== '');
    if (!filteredEntries.length) {
        return '';
    }
    const filteredObject = Object.fromEntries(filteredEntries) as T;

    const where = Object.entries(mapper).reduce((acc, [key, fn], i) => {
        if (filteredObject[key] === undefined) return acc;
        const { query, inserted } = acc;
        const result = fn(filteredObject[key], obj, initialTableAlias);

        return {
            query: `${query} ${inserted ? 'AND' : ''} ${result} `,
            inserted: Boolean(result),
        };
    }, {
        query: '',
        inserted: false,
    });

    return `WHERE ${where.query}`;
}
