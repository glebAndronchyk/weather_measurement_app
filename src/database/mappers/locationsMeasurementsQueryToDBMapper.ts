import {measurementsFieldToQueryMapper} from "./measurementsFieldToQueryMapper.js";
import {WhereMapper} from "../../lib/sql/index.js";
import {
    MeasurementQueryPayloadLocationBased
} from "../../model/domain/measurements/MeasurementQueryPayloadLocationBased.js";

export const locationsMeasurementsQueryToDBMapper: WhereMapper<MeasurementQueryPayloadLocationBased> = {
    ...measurementsFieldToQueryMapper,
    within: (val) => `
               ST_3DIntersects(
                    ST_Buffer
                    (
                        l.point,
                        ${val},
                        'quad_segs=8'
                    ),
                    tm.area
                )
            `
}