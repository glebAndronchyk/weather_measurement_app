import {measurementQueryPayloadValidation} from "./measurementQueryPayloadValidation.js";
import {paginationParamsSchema} from "../../paginationParamsSchema.js";

export const measurementQueryPayloadWithPaginationValidation = measurementQueryPayloadValidation.merge(paginationParamsSchema);