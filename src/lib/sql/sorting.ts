export const sorting = (order?: string, fields?: string[]) => {
    if (!order || !fields?.length) return "";

    return `
        ORDER BY ${fields.join(',')} ${order}
    `
}