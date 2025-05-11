import {PaginationParams} from "../../controllers/PaginationParams.js";
import {MeasurementQueryPayload, MeasurementQueryPayloadWithDBTableType} from "./MeasurementQueryPayload.js";

export type MeasurementQueryPayloadPaginated = PaginationParams & MeasurementQueryPayload;
export type MeasurementQueryPayloadPaginatedWithDBTableType = PaginationParams & MeasurementQueryPayloadWithDBTableType;