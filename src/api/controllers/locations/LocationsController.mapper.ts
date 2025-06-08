import { nearestMeasurementsMapper } from "../../../model/mapping/locations/index.ts";
import {mapAllMeasurementsResult} from "../../../model/mapping/measurements-base/index.js";

export const locationsControllerMapper = {
    nearestMeasurementsMapper,
    mapAllMeasurementsResult,
} as const;

export type LocationsControllerMapperSignature = typeof locationsControllerMapper;

