import {MeasurementQueryPayloadSupertype} from "./MeasurementQueryPayloadPaginated.js";

export type MeasurementQueryPayloadLocationBased = Omit<MeasurementQueryPayloadSupertype, 'coordinates' | 'ltc' | 'rbc'>;
