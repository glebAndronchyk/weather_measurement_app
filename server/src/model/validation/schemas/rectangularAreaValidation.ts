import {z} from "zod";
import {coordinatesTuple, inlineArray} from "./primitives/index.js";

export const rectangularAreaValidation = (args: { optional: boolean }) => {
    const coordinatesTupleValidation = inlineArray(coordinatesTuple);

    return z.object({
        ltc: args.optional ? coordinatesTupleValidation.optional() : coordinatesTupleValidation,
        rbc: args.optional ? coordinatesTupleValidation.optional() : coordinatesTupleValidation,
    });
}
