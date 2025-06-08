export const itemsCountQuery = (aggregator: (aggregateItemsField: string, countedItemsField: string) => string) => {
    const aggregateItemsField = 'items_array';
    const countedItemsField = 'total_items';

    return `
        SELECT 
            json_build_object(
                'items', COALESCE(${aggregateItemsField}, '[]'::jsonb),
                'totalItems', ${countedItemsField}
            ) as result
        FROM (
            ${aggregator(aggregateItemsField, countedItemsField)}
             )    
    `
}