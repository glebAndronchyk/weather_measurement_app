import {
    pagination,
    whereIncluded,
} from "../../lib/sql/index.js";
import {
    MeasurementQueryPayloadSupertype
} from "../../model/domain/measurements/MeasurementQueryPayloadPaginated.js";
import {allMeasurementsPayloadMapper} from "../mappers/allMeasurementsPayloadMapper.js";
import {itemsCountQuery} from "../../lib/sql/itemsCountQuery.js";

export const RAW_queryAllMeasurements = (obj: MeasurementQueryPayloadSupertype, initialTableAlias = 'measurement') => {
    const paginationQuery = pagination(obj);
    const whereQuery = whereIncluded(obj, allMeasurementsPayloadMapper, initialTableAlias);

    return itemsCountQuery(
        (aggregateItemsField, countedItemsField) => `
             (
                SELECT
                    count(*) as ${countedItemsField}
                FROM public."${obj.type}" ${initialTableAlias}
            ) 
                CROSS JOIN 
            (
                SELECT 
                    jsonb_agg(sub.*) as ${aggregateItemsField}
                FROM (
                    SELECT * 
                        FROM public."${obj.type}" ${initialTableAlias}
                        ${whereQuery}
                        ${paginationQuery}
                ) as sub
            )
        `
    );
}