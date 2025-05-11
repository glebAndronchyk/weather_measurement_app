import {PrismaClient} from "../../generated/prisma/index.js";
import {
    MeasurementQueryPayloadPaginatedWithDBTableType
} from "../../model/domain/measurements/MeasurementQueryPayloadPaginated.js";
import {RAW_queryAllMeasurements} from "../../database/queries/RAW_queryAllMeasurements.js";
import {GeojsonMeasurement} from "../../generated/prisma_custom/model/index.js";

export class MeasurementsBaseRepository {
    constructor(private connection: PrismaClient) {}

    async getMeasurements(obj: MeasurementQueryPayloadPaginatedWithDBTableType) {
        return this.connection.$queryRawUnsafe<GeojsonMeasurement[]>(RAW_queryAllMeasurements(obj));
    }
}
