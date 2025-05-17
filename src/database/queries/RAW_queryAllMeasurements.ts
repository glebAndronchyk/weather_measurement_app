import {pagination, whereIncluded, areaIntersectionQuery} from "../../lib/sql/index.js";
import {
    MeasurementQueryPayloadSupertype
} from "../../model/domain/measurements/MeasurementQueryPayloadPaginated.js";

const allMeasurementsQueryMapper: Parameters<typeof whereIncluded<MeasurementQueryPayloadSupertype>>[1] = {
    units: (val, _, initialTableAlias) => `
                (${initialTableAlias}.unit in (${val.map(entry => `'${entry}'`).join()}))
            `,
    device: (val) => `
                (device_id = ${val})
            `,
    date: (val) => `
                (timestamp = ${val}::timestamp)
            `,
    within: (val, { coordinates }, initialTableAlias) => `
                EXISTS(
                    SELECT 1 from public."Measurement"
                    WHERE id = ${initialTableAlias}.id
                    AND ST_3DDWithin(
                        area,
                        ST_SetSRID(ST_MakePoint(${coordinates[0]}, ${coordinates[1]}, ${coordinates[2]}), 4326),
                        ${val}
                    )
                )
            `,
    coordinates: (val, _, initialTableAlias) => `
                (ST_3DIntersects(
                    (SELECT area from public."Measurement" where id = ${initialTableAlias}.id),
                    ST_SetSRID(ST_MakePoint(${val[0]}, ${val[1]}, ${val[2]}), 4326)
                ))
            `,
    ltc: (val, { rbc }, initialTableAlias) =>
        areaIntersectionQuery(
            val,
            rbc,
            `(
                SELECT area
                from public."Measurement"
                where id = ${initialTableAlias}.id
            )`
        ),
    dateStart: (val, obj) => `
                (timestamp::date BETWEEN '${val}'::date AND '${obj.dateEnd}'::date)
            `
}

export const RAW_queryAllMeasurements = (obj: MeasurementQueryPayloadSupertype, initialTableAlias = 'measurement') => {
    const paginationQuery = pagination(obj);
    const whereQuery = whereIncluded(obj, allMeasurementsQueryMapper, initialTableAlias);

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