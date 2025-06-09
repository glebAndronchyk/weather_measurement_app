import {z} from "zod";
import {coordinatesTuple, decimalString, digitString, inlineArray} from "../../primitives/index.js";
import {EGeojsonMeasurementType} from "../../../../../database/enums/index.js";
import {UNITS} from "../../../../../generated/prisma/enums.js";

export const measurementQueryPayloadValidation = z.object({
    type: z.nativeEnum(EGeojsonMeasurementType).optional(),
    date: z.string().optional(),
    device: digitString.optional(),
    coordinates: inlineArray(coordinatesTuple),
    within: decimalString.optional(),
    dateStart: z.string().optional(),
    dateEnd: z.string().optional(),
    units: inlineArray(z.array(z.enum(Object.values(UNITS)))).optional(),
});

// todo: apply refine validation

// export const measurementQueryPayloadValidation = z.preprocess((input, ctx) => {
//     const parsed = measurementQueryPayloadValidationBase.pick({ dateStart: true, dateEnd: true, date: true }).safeParse(input);
//     console.log(23);
//     if (parsed.success) {
//         const { dateStart, dateEnd, date } = parsed.data;
//         console.log(33);
//         if (!date && (dateStart || dateEnd)) {
//             console.log(22);
//             if (!dateStart || !dateEnd) {
//                 console.log(44);
//                 ctx.addIssue({
//                     code: z.ZodIssueCode.custom,
//                     path: ["dateStart", "dateEnd"],
//                     message: "Date range should be independent and fully defined"
//                 })
//             }
//         }
//     }
//
//     return input
// }, measurementQueryPayloadValidationBase)
