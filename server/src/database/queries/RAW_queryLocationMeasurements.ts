import {
    MeasurementQueryPayloadLocationBased
} from "../../model/domain/measurements/MeasurementQueryPayloadLocationBased.js";
import {pagination, whereIncluded} from "../../lib/sql/index.js";
import {locationsMeasurementsQueryToDBMapper} from "../mappers/locationsMeasurementsQueryToDBMapper.js";
import {itemsCountQuery} from "../../lib/sql/itemsCountQuery.js";

/**
 * Queries measurements related to location within specific radius
 */
export const RAW_queryLocationMeasurements = (id: number | string, obj: MeasurementQueryPayloadLocationBased) => {
    const tableMeasurementsAlias = "tm";
    const geojsonMeasurementAlias = "gm";
    const locationAlias = "l";

    const paginationQuery =  pagination(obj);
    const whereQuery = whereIncluded(obj, locationsMeasurementsQueryToDBMapper, tableMeasurementsAlias);

    return itemsCountQuery(
        (aggregateItemsField, countedItemsField) => `
            (
                SELECT
                    count(*) as ${countedItemsField}
                FROM public."${obj.type}" ${geojsonMeasurementAlias}
            )
                CROSS JOIN
            (
                SELECT 
                        jsonb_agg(sub.*) as ${aggregateItemsField}
                FROM (
                    SELECT ${geojsonMeasurementAlias}.*
                    FROM public."Location" ${locationAlias}
                    INNER JOIN public."${obj.type}" ${geojsonMeasurementAlias}
                    ON EXISTS (
                        SELECT 1
                        FROM public."Measurement" ${tableMeasurementsAlias}
                        ${whereQuery}
                        ${whereQuery ? 'AND' : 'WHERE'}
                        (${tableMeasurementsAlias}.id = ${geojsonMeasurementAlias}.id)
                    )
                    WHERE ${locationAlias}.id = ${id}
                    ${paginationQuery}
                ) as sub 
            )
        `
    );
}