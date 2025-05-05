import { apiCore } from './apiCore.ts';
import { APP_CONTROLLERS } from "./controllers/index.ts";

APP_CONTROLLERS.forEach(controller => {
    controller.registerHandlers();
    apiCore.use(controller.getBaseUrl(), controller.getRouter());
});
