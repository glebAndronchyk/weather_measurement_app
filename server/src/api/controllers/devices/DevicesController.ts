import {ControllerBase} from "../../../model/controllers/ControllerBase.js";

export class DevicesController  extends ControllerBase<never> {
    constructor(baseUrl: string, mapper: never) {
        super(baseUrl, mapper);
    }

    registerHandlers = () => {
        this._GET();
        this._POST();
    }

    getBaseUrl = () => {
        return this._base;
    }

    getRouter = () => {
        return this._router;
    }

    // todo
    _POST() {}

    // todo
    _GET() {}
}
export const devicesController = new DevicesController('/devices', {} as never);
