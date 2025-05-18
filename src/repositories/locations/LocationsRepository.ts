import {Measurement, PrismaClient} from "../../generated/prisma/index.js";
import {RAW_queryLocations} from "../../database/queries/RAW_queryLocations.js";
import {
    LocationsFilteringQueryPayload
} from "../../model/domain/locations/LocationsFilteringQueryPayload.js";
import {GeojsonLocation} from "../../generated/prisma_custom/model/GeojsonLocation.js";
import {
    MeasurementQueryPayloadLocationBased
} from "../../model/domain/measurements/MeasurementQueryPayloadLocationBased.js";
import {RAW_queryLocationMeasurements} from "../../database/queries/RAW_queryLocationMeasurements.js";

export class LocationsRepository {
    constructor(private connection: PrismaClient) {}

    getLocationWithMeasurements(id: number | string, obj: MeasurementQueryPayloadLocationBased) {
        return this.connection.$queryRawUnsafe<Measurement[]>(RAW_queryLocationMeasurements(id, obj));
    }

    getAllLocations(obj: LocationsFilteringQueryPayload) {
        return this.connection.$queryRawUnsafe<GeojsonLocation[]>(RAW_queryLocations(obj));
    }
}
