import {MeasurementPayloadSpotted} from "../../model/domain/measurements/MeasurementQueryPayloadPaginated.js";
import {IdParams} from "../../model/controllers/IdParams.js";

/**
 * Queries latest measurements based on location. May be calculated within specific radius.
 * Aggregates all inherited tables from public."Measurement" schema
 */
export const RAW_queryLatestLocationMeasurements = (id: IdParams['id'], obj: MeasurementPayloadSpotted, tablesToQuery: string[]) => {
    return `
        WITH filtered_measurements AS (
--             selects all measurements by unique type
            SELECT DISTINCT ON (measurement_type) m.*
            FROM public."Location" l
            RIGHT JOIN public."Measurement" m
            ON (
                ST_3DIntersects(
                        ST_Buffer
                        (
                                ST_Transform(l.point, 3857),
                                ${obj.within},
                                'quad_segs=8'
                        ),
                        ST_Transform(m.area, 3857)
                    )
                )
            WHERE l.id = ${id}
--             orders measurements by measurement_type and takes latest measurements
            ORDER BY measurement_type, timestamp DESC
        )   
        SELECT jsonb_build_object(
            ${tablesToQuery.map(tableName => {
                const tableNameLowerCase = tableName.toLowerCase();
                const tableWithGeojsonRepresentation = `geojson_${tableNameLowerCase}`;
                const filteredMeasurementQueryAlias = `fm`;
                const geojsonRowAlias = 'geojson_row';
                
                return `
                    '${tableNameLowerCase}', (
                        SELECT jsonb_agg(row_to_json(row))
                        FROM (
                            SELECT * FROM public."${tableWithGeojsonRepresentation}" ${geojsonRowAlias}
                            WHERE ${geojsonRowAlias}.id in (
                                SELECT id
                                FROM filtered_measurements ${filteredMeasurementQueryAlias}
                                WHERE
                                ${filteredMeasurementQueryAlias}.measurement_type = ${geojsonRowAlias}.measurement_type)
                        ) row
                    )
                `
            }).join(',')}
        ) aggregation_result
    `
}