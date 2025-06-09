import {DatabaseSpottedMeasurementsDTO} from "../../dto/DatabaseSpottedMeasurementsDTO.js";
import {GeojsonMeasurement} from "../../../generated/prisma_custom/model/index.js";

export const nearestMeasurementsMapper = (obj: DatabaseSpottedMeasurementsDTO) => {
    const root = obj[0].aggregation_result;
    const rootEntries = Object.entries(root);


    return rootEntries.reduce<Record<string, GeojsonMeasurement | null>>(
        (acc, [key, val]) => {
            acc[key] = val ? val[0] : null;
            return acc;
        }, {}
    )
}
