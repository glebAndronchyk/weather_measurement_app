import {z} from "zod";
import {measurementQueryPayloadValidation} from "./measurementQueryPayloadValidation.js";
import {coordinatesTuple} from "../../primitives/index.js";

export const measurementQueryPayloadGeographyValidation = measurementQueryPayloadValidation.omit({
    lat: true,
    lon: true,
    extrusion: true,
    within: true,
}).merge(z.object({
    ltc: coordinatesTuple,
    rbc: coordinatesTuple,
}))
