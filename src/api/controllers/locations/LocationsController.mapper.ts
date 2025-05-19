import { nearestMeasurementsMapper } from "../../../model/mapping/locations/index.ts";

export const locationsControllerMapper = {
    nearestMeasurementsMapper
} as const;

export type LocationsControllerMapperSignature = typeof locationsControllerMapper;

