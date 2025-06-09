import {MEASUREMENT_TYPE, UNITS} from "../../../generated/prisma/enums.js";
import {GeoJSONGeometryCollection} from "wellknown";

export interface CreateMeasurementRequestPayload {
    type: MEASUREMENT_TYPE;
    unit: UNITS;
    device_id: number;
    area: GeoJSONGeometryCollection;
    timestamp: string;
    genericMetrics: string;
}

export interface CreateMeasurementDBPayload<Metric extends object = object> {
    type: Omit<typeof MEASUREMENT_TYPE, 'MEASUREMENT'>;
    unit: UNITS;
    device_id: number;
    area: string;
    genericMetrics: Metric;
    timestamp: string;
}
