import {measurementsFieldToQueryMapper} from "./measurementsFieldToQueryMapper.js";
import {WhereMapper} from "../../lib/sql/index.js";
import {
    MeasurementQueryPayloadLocationBased
} from "../../model/domain/measurements/MeasurementQueryPayloadLocationBased.js";

export const locationsMeasurementsQueryToDBMapper: WhereMapper<MeasurementQueryPayloadLocationBased> = {
    ...measurementsFieldToQueryMapper,
    within: (val) => `
               ST_3DIntersects(
                    ST_Buffer(
                        ST_Transform(l.point, 3857),
                        ${val},
                        'quad_segs=8'
                    ),
                    ST_Transform(tm.area, 3857)
                )
            `
}