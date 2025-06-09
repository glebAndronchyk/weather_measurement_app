import {GeojsonMeasurement} from "../../generated/prisma_custom/model/index.js";

export interface DatabaseAllMeasurementsCounted {
    items: GeojsonMeasurement[];
    totalItems: number;
}

export type DatabaseAllMeasurementsDTO = [{ result: DatabaseAllMeasurementsCounted }];
