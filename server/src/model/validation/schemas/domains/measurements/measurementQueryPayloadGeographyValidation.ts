import {measurementQueryPayloadValidation} from "./measurementQueryPayloadValidation.js";
import {rectangularAreaValidation} from "../../rectangularAreaValidation.js";

export const measurementQueryPayloadGeographyValidation = measurementQueryPayloadValidation.omit({
    coordinates: true,
    within: true,
}).merge(rectangularAreaValidation({ optional: false }))
