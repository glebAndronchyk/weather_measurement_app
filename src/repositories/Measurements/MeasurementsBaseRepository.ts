import {PrismaClient} from "../../generated/prisma/index.js";
import {
    MeasurementQueryPayloadSupertype
} from "../../model/domain/measurements/MeasurementQueryPayloadPaginated.js";
import {RAW_queryAllMeasurements} from "../../database/queries/RAW_queryAllMeasurements.js";
import {DatabaseAllMeasurementsDTO} from "../../model/dto/DatabaseAllMeasurementsDTO.js";
import {
    CreateMeasurementDBPayload,
} from "../../model/domain/measurements/CreateMeasurementPayload.js";
import {PrismaPromise} from "../../generated/prisma/internal/prismaNamespace.js";
import {measurementType_to_tableName} from "../../lib/sql/measurementTypeToTableName.js";
import {RAW_createSingleMeasurement} from "../../database/queries/RAW_createSingleMeasurement.js";

export class MeasurementsBaseRepository {
    constructor(private connection: PrismaClient) {}

    async createManyMeasurements(obj: CreateMeasurementDBPayload[]) {
        return this.connection.$transaction(
            obj.map(entry => this.createSingleMeasurement(entry))
        )
    }

    async getMeasurements(obj: MeasurementQueryPayloadSupertype) {
        return this.connection.$queryRawUnsafe<DatabaseAllMeasurementsDTO>(RAW_queryAllMeasurements(obj));
    }

    createSingleMeasurement(obj: CreateMeasurementDBPayload): PrismaPromise<never> {
        const tableName = measurementType_to_tableName[obj.type as never];

        return this.connection.$queryRawUnsafe(RAW_createSingleMeasurement(obj, tableName));
    }
}
