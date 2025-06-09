import {EGeojsonMeasurementType} from "../../../database/enums/index.js";
import { type UNITS } from "../../../generated/prisma/enums.js";
import {Coordinates} from "../../tuples/Coordinates.js";

export interface MeasurementQueryPayloadWithDBTableType extends Omit<MeasurementQueryPayload, 'type'> {
    type: string;
}

export interface MeasurementQueryPayload {
    date?: string;
    coordinates: Coordinates;
    device?: number;
    dateStart?: string;
    dateEnd?: string;
    within?: number;
    units?: UNITS[];
    type?: EGeojsonMeasurementType;
}