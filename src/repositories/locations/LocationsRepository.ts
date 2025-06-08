import {Measurement, PrismaClient} from "../../generated/prisma/index.js";
import {LocationsFilteringQueryPayload} from "../../model/domain/locations/LocationsFilteringQueryPayload.js";
import {GeojsonLocation} from "../../generated/prisma_custom/model/GeojsonLocation.js";
import {
    MeasurementQueryPayloadLocationBased
} from "../../model/domain/measurements/MeasurementQueryPayloadLocationBased.js";

import {RAW_queryLocations} from "../../database/queries/RAW_queryLocations.js";
import {RAW_queryLocationMeasurements} from "../../database/queries/RAW_queryLocationMeasurements.js";
import {RAW_queryLatestLocationMeasurements} from "../../database/queries/RAW_queryLatestLocationMeasurements.js";
import {EGeojsonMeasurementType} from "../../database/enums/index.js";
import {
    MeasurementPayloadSpotted,
} from "../../model/domain/measurements/MeasurementQueryPayloadPaginated.js";
import {IdParams} from "../../model/controllers/IdParams.js";
import {DatabaseSpottedMeasurementsDTO} from "../../model/dto/DatabaseSpottedMeasurementsDTO.js";
import {CreateLocationDTO} from "../../model/dto/CreateLocationDTO.js";
import {toSqlJson} from "../../lib/sql/toSqlJson.js";
import {DatabaseAllMeasurementsDTO} from "../../model/dto/DatabaseAllMeasurementsDTO.js";

export class LocationsRepository {
    constructor(private connection: PrismaClient) {}

    async getLatestMeasurements(id: IdParams['id'], obj: MeasurementPayloadSpotted) {
        let tablesToQuery = [obj.type.replace('geojson_', '')];

        if (obj.type === EGeojsonMeasurementType.Measurement) {
            const tablesResponse = await this.connection.measurement_children.findMany();
            tablesToQuery = tablesResponse.map(entry => entry.child_table) as EGeojsonMeasurementType[];
        }

        return this.connection.$queryRawUnsafe<DatabaseSpottedMeasurementsDTO>(RAW_queryLatestLocationMeasurements(id, obj, tablesToQuery));
    }

    getLocationWithMeasurements(id: number | string, obj: MeasurementQueryPayloadLocationBased) {
        return this.connection.$queryRawUnsafe<DatabaseAllMeasurementsDTO>(RAW_queryLocationMeasurements(id, obj));
    }

    getAllLocations(obj: LocationsFilteringQueryPayload) {
        return this.connection.$queryRawUnsafe<GeojsonLocation[]>(RAW_queryLocations(obj));
    }

    createLocation(locationPayload: CreateLocationDTO) {
        const { type, metadata, point } = locationPayload;
        const sqlJSON = toSqlJson(JSON.stringify(metadata));

        return this.connection.$queryRawUnsafe(
            `
                INSERT INTO public."Location" (type, metadata, point)
                VALUES (
                               '${type}',
                               ${sqlJSON}::jsonb,
                               ST_SetSRID(ST_MakePoint(${point[0]}, ${point[1]}), 4326)
                       )
                RETURNING id;
            `
        );
    }
}
