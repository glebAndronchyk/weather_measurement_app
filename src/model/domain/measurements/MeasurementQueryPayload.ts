import {EGeojsonMeasurementType} from "../../../database/enums/index.js";
import { type UNITS } from "../../../generated/prisma/enums.js";

export interface MeasurementQueryPayloadWithDBTableType extends Omit<MeasurementQueryPayload, 'type'> {
    type: string;
}

export interface MeasurementQueryPayload {
    date?: string;
    lat?: number;
    lon?: number;
    extrusion?: number;
    device?: number;
    dateStart?: string;
    dateEnd?: string;
    within?: number;
    units?: UNITS[];
    type?: EGeojsonMeasurementType;
}