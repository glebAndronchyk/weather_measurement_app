import {pagination, whereIncluded} from "../../lib/sql/index.js";
import {
    MeasurementQueryPayloadPaginatedWithDBTableType
} from "../../model/domain/measurements/MeasurementQueryPayloadPaginated.js";

const allMeasurementsQueryMapper: Parameters<typeof whereIncluded<MeasurementQueryPayloadPaginatedWithDBTableType>>[1] = {
    device: (val) => `
                (device_id = ${val})
            `,
    date: (val) => `
                (timestamp = ${val}::timestamp)
            `,
    within: (val, obj) => `
                EXISTS(
                    SELECT 1 from public."Measurement"
                    WHERE id = gm.id
                    AND ST_3DDWithin(
                        area,
                        ST_SetSRID(ST_MakePoint(${val}, ${obj.lon}, ${obj.extrusion}), 4326),
                        ${val}
                    )
                )
            `,
    lat: (val, obj) => `
                (ST_Intersects(
                    (SELECT area from public."Measurement" where id = gm.id),
                    ST_SetSRID(ST_MakePoint(${val}, ${obj.lon}, ${obj.extrusion}), 4326)
                ))
            `,
    dateStart: (val, obj) => `
                (timestamp::date >= '${val}'::date) AND (timestamp <= '${obj.dateEnd}'::date)
            `
}

export const RAW_queryAllMeasurements = (obj: MeasurementQueryPayloadPaginatedWithDBTableType) => `
        SELECT *
        FROM public."${obj.type}" gm
        ${whereIncluded(obj, allMeasurementsQueryMapper)}
        ${pagination(obj)};
`