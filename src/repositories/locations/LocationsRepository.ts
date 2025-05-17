import {PrismaClient} from "../../generated/prisma/index.js";
import {RAW_queryLocations} from "../../database/queries/RAW_queryLocations.js";
import {
    LocationsFilteringQueryPayload
} from "../../model/domain/locations/LocationsFilteringQueryPayload.js";
import {GeojsonLocation} from "../../generated/prisma_custom/model/GeojsonLocation.js";

export class LocationsRepository {
    constructor(private connection: PrismaClient) {}

    async getLocationWithMeasurements(id: number, obj: never) {

    }

    async getAllLocations(obj: LocationsFilteringQueryPayload) {
        return this.connection.$queryRawUnsafe<GeojsonLocation[]>(RAW_queryLocations(obj));
    }
}
