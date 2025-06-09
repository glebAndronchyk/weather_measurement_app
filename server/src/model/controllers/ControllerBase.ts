import {Router} from "express";
import {MapperBase} from "../mapping/MapperBase.js";

export abstract class ControllerBase<TMapper extends MapperBase<unknown, unknown>> {
    protected readonly _router: Router;
    protected readonly _base: string;
    protected readonly _mapper: TMapper;

    abstract getRouter: () => Router;
    abstract getBaseUrl: () => string;
    abstract registerHandlers: () => void;

    protected constructor(base: string, mapper: TMapper) {
        this._router = Router();
        this._base = base;
        this._mapper = mapper;
    }
}
