import {PrismaClient} from "../../generated/prisma/index.js";
import {
    MeasurementQueryPayloadSupertype
} from "../../model/domain/measurements/MeasurementQueryPayloadPaginated.js";
import {RAW_queryAllMeasurements} from "../../database/queries/RAW_queryAllMeasurements.js";
import {DatabaseAllMeasurementsDTO} from "../../model/dto/DatabaseAllMeasurementsDTO.js";

export class MeasurementsBaseRepository {
    constructor(private connection: PrismaClient) {}

    async getMeasurements(obj: MeasurementQueryPayloadSupertype) {
        return this.connection.$queryRawUnsafe<DatabaseAllMeasurementsDTO>(RAW_queryAllMeasurements(obj));
    }
}
