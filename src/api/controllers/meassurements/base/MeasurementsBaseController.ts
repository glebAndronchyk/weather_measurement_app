import {ControllerBase} from "../../../../model/controllers/ControllerBase.js";
import repositories from "../../../../repositories/index.js";
import {MeasurementsBaseRepository} from "../../../../repositories/measurements/index.ts";
import {RequestHandler} from "express";
import {BaseResponse} from "../../../../model/controllers/errors/index.js";
import {EStatusCode} from "../../../../model/enums/index.js";
import {internalServerErrorDecorator} from "../../../../lib/decorators/controllers/internalServerErrorDecorator.js";
import {queryValidationDecorator} from "../../../../lib/decorators/controllers/queryValidationDecorator.js";
import {
    measurementQueryPayloadGeographyValidation,
    measurementQueryPayloadWithPaginationValidation
} from "../../../../model/validation/schemas/domains/measurements/index.js";
import {
    MeasurementQueryPayloadPaginated, MeasurementQueryPayloadSupertype,
} from "../../../../model/domain/measurements/MeasurementQueryPayloadPaginated.js";
import {
    measurementsBaseControllerMapper,
    MeasurementsBaseControllerMapperSignature
} from "./MeasurementsBaseController.mapper.js";

export class MeasurementsBaseController extends ControllerBase<MeasurementsBaseControllerMapperSignature> {
   private _measurementsBaseRepository: MeasurementsBaseRepository;

    constructor(baseUrl: string, mapper: MeasurementsBaseControllerMapperSignature, measurementsBaseRepository: MeasurementsBaseRepository) {
       super(baseUrl, mapper);
       this._measurementsBaseRepository = measurementsBaseRepository;
    }

    registerHandlers = () => {
        this._GET();
        this._GET_BY_AREA();
    }

    getBaseUrl = () => {
        return this._base;
    }

    getRouter = () => {
        return this._router;
    }

    _GET_BY_AREA() {
        const query: RequestHandler<{}, {}, {}, MeasurementQueryPayloadSupertype> = async (req, res) => {
            const query = req.query;
            const measurements = await this._measurementsBaseRepository.getMeasurements(
                this._mapper.mapSingleMeasurementToHaveDBTableType(query)
            );
            const mappedMeasurements = this._mapper.mapGeoJsonMeasurementsToDTO(measurements);
            const response = new BaseResponse().setData(mappedMeasurements).toDTO();

            res.status(EStatusCode.SUCCESS).json(response);
        };

        this._router.get('*area', internalServerErrorDecorator(queryValidationDecorator(query, measurementQueryPayloadGeographyValidation)));
    }

    _GET() {
        const query: RequestHandler<{}, {}, {}, MeasurementQueryPayloadPaginated> = async (req, res) => {
            const query = req.query;
            const measurements = await this._measurementsBaseRepository.getMeasurements(
                this._mapper.mapSingleMeasurementToHaveDBTableType(query)
            );
            const mappedMeasurements = this._mapper.mapGeoJsonMeasurementsToDTO(measurements);
            const response = new BaseResponse().setData(mappedMeasurements).toDTO();

            res.status(EStatusCode.SUCCESS).json(response);
        };

        this._router.get('/', internalServerErrorDecorator(queryValidationDecorator(query, measurementQueryPayloadWithPaginationValidation)));
    }
}

export const measurementsBaseController = new MeasurementsBaseController('/measurements', measurementsBaseControllerMapper, repositories.measurementsBase);
