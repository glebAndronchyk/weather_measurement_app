import {
    mapSingleMeasurementToHaveDBTableType,
    mapAllMeasurementsResult
} from "../../../../model/mapping/measurements-base/index.js";

export const measurementsBaseControllerMapper = {
    mapAllMeasurementsResult,
    mapSingleMeasurementToHaveDBTableType,
} as const;

export type MeasurementsBaseControllerMapperSignature = typeof measurementsBaseControllerMapper;
