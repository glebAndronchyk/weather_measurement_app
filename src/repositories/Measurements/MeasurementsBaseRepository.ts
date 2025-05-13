import {PrismaClient} from "../../generated/prisma/index.js";
import {
    MeasurementQueryPayloadPaginatedWithDBTableType, MeasurementQueryPayloadSupertype
} from "../../model/domain/measurements/MeasurementQueryPayloadPaginated.js";
import {RAW_queryAllMeasurements} from "../../database/queries/RAW_queryAllMeasurements.js";
import {GeojsonMeasurement} from "../../generated/prisma_custom/model/index.js";

export class MeasurementsBaseRepository {
    constructor(private connection: PrismaClient) {}

    async getMeasurements(obj: MeasurementQueryPayloadSupertype) {
        return this.connection.$queryRawUnsafe<GeojsonMeasurement[]>(RAW_queryAllMeasurements(obj));
    }
}
