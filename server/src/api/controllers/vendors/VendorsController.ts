import {ControllerBase} from "../../../model/controllers/ControllerBase.js";
import {RequestHandler} from "express";
import {VendorsRepository} from "../../../repositories/Vendors/index.js";
import repositories from "../../../repositories/index.js";
import {PaginationParams} from "../../../model/controllers/PaginationParams.js";
import {paramsValidationDecorator} from "../../../lib/decorators/controllers/paramsValidationDecorator.js";
import {idSchema, paginationParamsSchema} from "../../../model/validation/schemas/index.js";
import {EStatusCode} from "../../../model/enums/index.js";
import {internalServerErrorDecorator} from "../../../lib/decorators/controllers/internalServerErrorDecorator.js";
import {queryValidationDecorator} from "../../../lib/decorators/controllers/queryValidationDecorator.js";
import {bodyValidationDecorator} from "../../../lib/decorators/controllers/bodyValidationDecorator.js";
import {BaseResponse} from "../../../model/controllers/errors/index.js";
import {NewVendorPayload} from "../../../model/domain/vendors/index.js";
import {newVendorBodyValidation} from "../../../model/validation/schemas/domains/vendors/index.js";

export class VendorsController extends ControllerBase<never> {
    private readonly _vendorsRepository: VendorsRepository;

     constructor(baseUrl: string, mapper:never, vendorsRepository: VendorsRepository) {
        super(baseUrl, mapper);
        this._vendorsRepository = vendorsRepository;
    }

    registerHandlers = () => {
        this._GET_ALL();
        this._GET_SINGLE();
        this._POST();
        this._PATCH();
    }

    getBaseUrl = () => {
        return this._base;
    }

    getRouter = () => {
        return this._router;
    }

    private _PATCH() {
        const query: RequestHandler<{ id: number }, {}, Partial<NewVendorPayload>> = async (
            req,
            res
        ) => {
            const vendorPayload = req.body;
            const vendorId = req.params.id;
            await this._vendorsRepository.updateVendor(vendorId, vendorPayload);
            const response = new BaseResponse();

            res.status(EStatusCode.SUCCESS).json(response);
        };

        const decoratedQuery =
            internalServerErrorDecorator(
                paramsValidationDecorator(
                    bodyValidationDecorator(
                        query, newVendorBodyValidation.optional()
                    ),
                    idSchema,
                )
            );

        this._router.patch('/:id', decoratedQuery);
    }

    private _POST() {
        const query: RequestHandler<{}, {}, NewVendorPayload> = async (
            req,
           res
        ) => {
            const vendorPayload = req.body;
            await this._vendorsRepository.createVendor(vendorPayload);
            const response = new BaseResponse();

            res.status(EStatusCode.SUCCESS).json(response);
        };

        const decoratedQuery =
            internalServerErrorDecorator(
                bodyValidationDecorator(
                    query,
                    newVendorBodyValidation
                )
            );

        this._router.post('/', decoratedQuery);
    }

    private _GET_SINGLE() {
        const query: RequestHandler<{ id: number }> = async (
            req,
            res
        ) => {
            const vendorId = req.params.id;
            const vendor = await this._vendorsRepository.getVendor(vendorId);
            const response = new BaseResponse().setData(vendor).toDTO();

            res.status(EStatusCode.SUCCESS).json(response)
        };

        const decoratedQuery =
            internalServerErrorDecorator(
                paramsValidationDecorator(
                    query,
                    idSchema
                )
            );

        this._router.get('/:id', decoratedQuery);
    }

    private _GET_ALL() {
        const query: RequestHandler<{}, {}, {}, PaginationParams> = async (
            req,
            res
        ) => {
            const pagination = req.query;
            const vendors = await this._vendorsRepository.getAllVendors(pagination);
            const response = new BaseResponse().setData(vendors).toDTO();

            res.status(EStatusCode.SUCCESS).json(response);
        };

        this._router.get('/',
            internalServerErrorDecorator(
                queryValidationDecorator(
                    query,
                    paginationParamsSchema)
            )
        );
    }
}

const vendorsController = new VendorsController('/vendors', {} as never, repositories.vendors);
export default vendorsController;
