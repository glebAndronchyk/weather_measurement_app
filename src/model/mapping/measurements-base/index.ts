import {GeojsonMeasurement} from "../../../generated/prisma_custom/model/index.js";
import {GeoJson} from "../../../lib/geo/index.js";
import {
    MeasurementQueryPayloadPaginated,
    MeasurementQueryPayloadPaginatedWithDBTableType
} from "../../domain/measurements/MeasurementQueryPayloadPaginated.js";
import {EGeojsonMeasurementType} from "../../../database/enums/index.js";

const mapSingleGeoJsonMeasurementToDTO = (obj: GeojsonMeasurement) => ({
    ...obj,
    date: obj.timestamp,
    deviceId: obj.device_id,
    area: new GeoJson(obj.area).singleFeature(),
});

export const mapSingleMeasurementToHaveDBTableType = (obj: MeasurementQueryPayloadPaginated): MeasurementQueryPayloadPaginatedWithDBTableType => ({
    ...obj,
    type: obj.type || EGeojsonMeasurementType.Measurement,
})

export const mapGeoJsonMeasurementsToDTO = (arr: GeojsonMeasurement[])=> arr.map(mapSingleGeoJsonMeasurementToDTO);
