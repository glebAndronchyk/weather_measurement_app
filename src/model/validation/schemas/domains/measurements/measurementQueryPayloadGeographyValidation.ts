import {z} from "zod";
import {measurementQueryPayloadValidation} from "./measurementQueryPayloadValidation.js";
import {coordinatesTuple, inlineArray} from "../../primitives/index.js";

export const measurementQueryPayloadGeographyValidation = measurementQueryPayloadValidation.omit({
    coordinates: true,
    within: true,
}).merge(z.object({
    ltc: inlineArray(coordinatesTuple),
    rbc: inlineArray(coordinatesTuple),
}))
