export const toSqlJson = (jsonString: string) => {
    return `'${jsonString.slice(1, -1).replaceAll("\\", '')}'`;
}
