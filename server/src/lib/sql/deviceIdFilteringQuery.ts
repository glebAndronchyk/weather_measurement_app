export const deviceIdFilteringQuery = (val: string | number) => {
    return `
                device_id = ${val}
            `
}
