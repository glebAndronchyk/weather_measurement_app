import {PaginationParams} from "../../controllers/PaginationParams.js";
import {MeasurementQueryPayload, MeasurementQueryPayloadWithDBTableType} from "./MeasurementQueryPayload.js";
import {Coordinates} from "../../tuples/Coordinates.js";

export type MeasurementQueryPayloadPaginated = PaginationParams & MeasurementQueryPayload;
export type MeasurementQueryPayloadPaginatedWithDBTableType = PaginationParams & MeasurementQueryPayloadWithDBTableType;
export type MeasurementQueryPayloadGeographic = Omit<MeasurementQueryPayload, 'lat' | 'lon' | 'extrusion' | 'within'> & {
    ltc: Coordinates<string>;
    rbc: Coordinates<string>;
};

export type MeasurementQueryPayloadSupertype = Partial<MeasurementQueryPayloadPaginated & MeasurementQueryPayloadPaginatedWithDBTableType & MeasurementQueryPayloadGeographic>;
