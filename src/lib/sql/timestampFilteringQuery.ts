export const timestampFilteringQuery =  (val: string | number) => {
    return `
                (timestamp = ${val}::timestamp)
            `
}