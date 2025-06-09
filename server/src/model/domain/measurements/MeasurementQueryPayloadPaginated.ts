import {PaginationParams} from "../../controllers/PaginationParams.js";
import {MeasurementQueryPayload, MeasurementQueryPayloadWithDBTableType} from "./MeasurementQueryPayload.js";
import {RectangularArea} from "../../controllers/RectangularArea.js";

export type MeasurementQueryPayloadPaginated = PaginationParams & MeasurementQueryPayload;
export type MeasurementQueryPayloadPaginatedWithDBTableType = PaginationParams & MeasurementQueryPayloadWithDBTableType;
export type MeasurementQueryPayloadGeographic = Omit<MeasurementQueryPayload, 'lat' | 'lon' | 'extrusion' | 'within' | 'coordinates'> & RectangularArea;

export type MeasurementPayloadSpotted = Pick<MeasurementQueryPayloadSupertype, 'within' | 'type'>;

export type MeasurementQueryPayloadSupertype = Partial<
    MeasurementQueryPayloadPaginated &
    MeasurementQueryPayloadPaginatedWithDBTableType &
    MeasurementQueryPayloadGeographic
>;
