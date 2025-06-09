import {areaIntersectionQuery, WhereMapper} from "../../lib/sql/index.js";
import {measurementsFieldToQueryMapper} from "./measurementsFieldToQueryMapper.js";
import {MeasurementQueryPayloadSupertype} from "../../model/domain/measurements/MeasurementQueryPayloadPaginated.js";

export const allMeasurementsPayloadMapper: WhereMapper<MeasurementQueryPayloadSupertype> = {
    ...measurementsFieldToQueryMapper,
    within: (val, { coordinates }, initialTableAlias) => `
                EXISTS(
                    SELECT 1 from public."Measurement"
                    WHERE id = ${initialTableAlias}.id
                    AND ST_3DDWithin(
                        ST_Transform(area, 3857),
                        ST_Transform(ST_SetSRID(ST_MakePoint(${coordinates[0]}, ${coordinates[1]}, ${coordinates[2]}), 4326), 3857),
                        ${val}
                    )
                )
            `,
    coordinates: (val, { within }, initialTableAlias) => within ? '' : `
                ST_3DIntersects(
                    (SELECT area from public."Measurement" where id = ${initialTableAlias}.id),
                    ST_SetSRID(ST_MakePoint(${val[0]}, ${val[1]}, ${val[2]}), 4326)
                )
            `,
    ltc: (val, { rbc }, initialTableAlias) =>
        areaIntersectionQuery(
            val,
            rbc,
            `
                SELECT area
                from public."Measurement"
                where id = ${initialTableAlias}.id
            `
        ),
}