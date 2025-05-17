import * as measurementsControllers from './meassurements/index.ts';
import * as vendorsController from './vendors/index.ts';
import * as locationsController from './locations/index.ts';
import {ControllerBase} from "../../model/controllers/ControllerBase.js";

export const APP_CONTROLLERS: ControllerBase<any>[] = [
    ...Object.values(vendorsController),
    ...Object.values(measurementsControllers),
    ...Object.values(locationsController),
];