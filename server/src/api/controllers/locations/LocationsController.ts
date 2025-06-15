import {ControllerBase} from "../../../model/controllers/ControllerBase.js";
import {RequestHandler} from "express";
import {internalServerErrorDecorator} from "../../../lib/decorators/controllers/internalServerErrorDecorator.js";
import {LocationsRepository} from "../../../repositories/locations/index.js";
import repositories from "../../../repositories/index.js";
import {LocationsFilteringQueryPayload} from "../../../model/domain/locations/LocationsFilteringQueryPayload.js";
import {BaseResponse} from "../../../model/controllers/errors/index.js";
import {EStatusCode} from "../../../model/enums/index.js";
import {queryValidationDecorator} from "../../../lib/decorators/controllers/queryValidationDecorator.js";
import {locationsQueryPayloadValidation} from "../../../model/validation/schemas/domains/locations/index.js";
import {IdParams} from "../../../model/controllers/IdParams.js";
import {paramsValidationDecorator} from "../../../lib/decorators/controllers/paramsValidationDecorator.js";
import {idSchema} from "../../../model/validation/schemas/index.js";
import {locationsControllerMapper, LocationsControllerMapperSignature} from "./LocationsController.mapper.js";
import {MeasurementPayloadSpotted} from "../../../model/domain/measurements/MeasurementQueryPayloadPaginated.js";
import {CreateLocationDTO} from "../../../model/dto/CreateLocationDTO.js";
import {OnlyQueryRequest} from "../../../model/controllers/Request.js";

export class LocationsController extends ControllerBase<LocationsControllerMapperSignature> {
    private locationsRepository: LocationsRepository;

    constructor(baseUrl: string, mapper: LocationsControllerMapperSignature, locationsRepository: LocationsRepository) {
        super(baseUrl, mapper);
        this.locationsRepository = locationsRepository;
    }

    registerHandlers = () => {
        this._GET();
        this._POST_LOCATION();
        this._GET_LOCATION_WITH_MEASUREMENTS();
        this._GET_LATEST_LOCATION_MEASUREMENT();
    }

    getBaseUrl = () => {
        return this._base;
    }

    getRouter = () => {
        return this._router;
    }

    _POST_LOCATION() {
        const query: RequestHandler<{}, {}, CreateLocationDTO, {}> = async (
            req,
            res
        ) => {
            const body = req.body;

            const id = await this.locationsRepository.createLocation(body);

            const response = new BaseResponse().setData({ id }).toDTO();
            res.status(EStatusCode.SUCCESS).json(response);
        };

        this._router.post('/',
            internalServerErrorDecorator(
                query,
            )
        );
    }

    _GET_LATEST_LOCATION_MEASUREMENT = () => {
        const query: RequestHandler<IdParams, {}, {}, MeasurementPayloadSpotted> = async (
            req,
            res
        ) => {
            const payload = req.query;
            const id = req.params.id;
            const measurements = await this.locationsRepository.getLatestMeasurements(id, payload);
            const remappedMeasurements = this._mapper.nearestMeasurementsMapper(measurements);

            const response = new BaseResponse().setData(remappedMeasurements).toDTO();

            res.status(EStatusCode.SUCCESS).json(response);
        };

        // todo add better validation
        this._router.get('/:id/measurements/latest',
            internalServerErrorDecorator(
                paramsValidationDecorator(
                    // queryValidationDecorator(
                    query,
                    // z.object({})
                    // ),
                    idSchema,
                )
            )
        );
    }

    _GET_LOCATION_WITH_MEASUREMENTS = () => {
        const query: RequestHandler<IdParams, {}, {}, LocationsFilteringQueryPayload> = async (
            req,
            res
        ) => {
            const payload = req.query;
            const id = req.params.id;
            const measurements = await this.locationsRepository.getLocationWithMeasurements(id, payload);
            const remappedResult = this._mapper.mapAllMeasurementsResult(measurements);
            const response = new BaseResponse().setData(remappedResult).toDTO();

            res.status(EStatusCode.SUCCESS).json(response);
        };

        // todo add better validation
        this._router.get('/:id/measurements',
            internalServerErrorDecorator(
                paramsValidationDecorator(
                    // queryValidationDecorator(
                        query,
                        // z.object({})
                    // ),
                    idSchema,
                )
            )
        );
    }

    _GET() {
        const query: OnlyQueryRequest<LocationsFilteringQueryPayload> = async (
            req,
            res
        ) => {
            const query = req.query;
            const locations = await this.locationsRepository.getAllLocations(query);
            const response = new BaseResponse().setData(locations).toDTO();

            res.status(EStatusCode.SUCCESS).json(response);
        };

        this._router.get('/',
            internalServerErrorDecorator(
                queryValidationDecorator(
                    query,
                    locationsQueryPayloadValidation)
            )
        );
    }
}

export const locationsController = new LocationsController("/locations", locationsControllerMapper, repositories.locations)
