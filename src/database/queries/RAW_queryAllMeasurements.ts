import {
    pagination,
    whereIncluded,
} from "../../lib/sql/index.js";
import {
    MeasurementQueryPayloadSupertype
} from "../../model/domain/measurements/MeasurementQueryPayloadPaginated.js";
import {allMeasurementsPayloadMapper} from "../mappers/allMeasurementsPayloadMapper.js";

export const RAW_queryAllMeasurements = (obj: MeasurementQueryPayloadSupertype, initialTableAlias = 'measurement') => {
    const paginationQuery = pagination(obj);
    const whereQuery = whereIncluded(obj, allMeasurementsPayloadMapper, initialTableAlias);

    return `
        SELECT 
            json_build_object(
                'items', COALESCE(items_array, '[]'::jsonb),
                'totalItems', total_items
            ) as result
        FROM 
            (
                SELECT
                    count(*) as total_items
                FROM public."${obj.type}" ${initialTableAlias}
            ) 
                CROSS JOIN 
            (
                SELECT 
                    jsonb_agg(sub.*) as items_array
                FROM (
                    SELECT * 
                        FROM public."${obj.type}" ${initialTableAlias}
                        ${whereQuery}
                        ${paginationQuery}
                ) as sub
            )
    `
}