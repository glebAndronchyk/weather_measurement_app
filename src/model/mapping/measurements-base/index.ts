import {GeojsonMeasurement} from "../../../generated/prisma_custom/model/index.js";
import {GeoJson} from "../../../lib/geo/index.js";
import {
    MeasurementQueryPayloadSupertype
} from "../../domain/measurements/MeasurementQueryPayloadPaginated.js";
import {EGeojsonMeasurementType} from "../../../database/enums/index.js";

const mapSingleGeoJsonMeasurementToDTO = ({ area, ...wontRemap }: GeojsonMeasurement) => ({
    ...wontRemap,
    area: new GeoJson(area).singleFeature(),
});

export const mapSingleMeasurementToHaveDBTableType = (obj: MeasurementQueryPayloadSupertype): MeasurementQueryPayloadSupertype => ({
    ...obj,
    type: obj.type || EGeojsonMeasurementType.Measurement,
})

export const mapGeoJsonMeasurementsToDTO = (arr: GeojsonMeasurement[])=> arr.map(mapSingleGeoJsonMeasurementToDTO);
