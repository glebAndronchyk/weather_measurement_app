import { vendorsController } from './vendors/index.ts';
import {ControllerBase} from "../../model/controllers/ControllerBase.js";

export const APP_CONTROLLERS: ControllerBase<any>[] = [
    vendorsController,
];