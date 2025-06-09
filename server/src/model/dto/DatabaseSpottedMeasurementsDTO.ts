import {GeojsonMeasurement} from "../../generated/prisma_custom/model/index.js";

export type DatabaseSpottedMeasurementsDTO = [{ aggregation_result: Record<string, GeojsonMeasurement[] | null> }];
