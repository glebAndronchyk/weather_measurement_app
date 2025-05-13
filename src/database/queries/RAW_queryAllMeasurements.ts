import {pagination, whereIncluded} from "../../lib/sql/index.js";
import {
    MeasurementQueryPayloadSupertype
} from "../../model/domain/measurements/MeasurementQueryPayloadPaginated.js";

const allMeasurementsQueryMapper: Parameters<typeof whereIncluded<MeasurementQueryPayloadSupertype>>[1] = {
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
                (ST_3DIntersects(
                    (SELECT area from public."Measurement" where id = gm.id),
                    ST_SetSRID(ST_MakePoint(${val}, ${obj.lon}, ${obj.extrusion}), 4326)
                ))
            `,
    ltc: (val, { rbc }) => `
                (ST_3DIntersects(
                    ST_3DMakeBox(
                        ST_SetSRID(ST_MakePoint(${val[0]}, ${val[1]}, ${val[2]}), 4326),
                        ST_SetSRID(ST_MakePoint(${rbc[0]}, ${rbc[1]}, ${rbc[2]}), 4326)
                    ),
                    (SELECT area from public."Measurement" where id = gm.id)
                ))
            `,
    dateStart: (val, obj) => `
                (timestamp::date >= '${val}'::date) AND (timestamp <= '${obj.dateEnd}'::date)
            `
}

export const RAW_queryAllMeasurements = (obj: MeasurementQueryPayloadSupertype) => `
        SELECT *
        FROM public."${obj.type}" gm
        ${whereIncluded(obj, allMeasurementsQueryMapper)}
        ${pagination(obj)};
`