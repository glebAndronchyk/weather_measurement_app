import { vendorsController } from './vendors/index.ts';
import * as measurementsControllers from './meassurements/index.ts';
import {ControllerBase} from "../../model/controllers/ControllerBase.js";

export const APP_CONTROLLERS: ControllerBase<any>[] = [
    vendorsController,
    ...Object.values(measurementsControllers),
];