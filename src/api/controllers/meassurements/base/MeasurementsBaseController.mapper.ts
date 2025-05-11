import {
    mapGeoJsonMeasurementsToDTO,
    mapSingleMeasurementToHaveDBTableType
} from "../../../../model/mapping/measurements-base/index.js";

export const measurementsBaseControllerMapper = {
    mapGeoJsonMeasurementsToDTO,
    mapSingleMeasurementToHaveDBTableType,
} as const;

export type MeasurementsBaseControllerMapperSignature = typeof measurementsBaseControllerMapper;
