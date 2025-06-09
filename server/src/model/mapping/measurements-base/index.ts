import {
    MeasurementQueryPayloadSupertype
} from "../../domain/measurements/MeasurementQueryPayloadPaginated.js";
import {EGeojsonMeasurementType} from "../../../database/enums/index.js";
import {DatabaseAllMeasurementsDTO} from "../../dto/DatabaseAllMeasurementsDTO.js";

export const mapAllMeasurementsResult = (dto: DatabaseAllMeasurementsDTO) => dto[0].result;

export const mapSingleMeasurementToHaveDBTableType = (obj: MeasurementQueryPayloadSupertype): MeasurementQueryPayloadSupertype => ({
    ...obj,
    type: obj.type || EGeojsonMeasurementType.Measurement,
})
