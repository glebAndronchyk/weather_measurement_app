export const dateRangeFilteringQuery = (datStart: string, dateEnd: string) => {
    return `
                timestamp::date BETWEEN '${datStart}'::date AND '${dateEnd}'::date
            `;
}
