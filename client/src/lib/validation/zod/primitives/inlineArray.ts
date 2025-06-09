import {z} from "zod";

export const inlineArray = (arrayRefinement: z.ZodTypeAny) => z.string()
    .regex(/^([^,]+)(,[^,]+)*$/)
    .transform((str) => {
        return str.split(',');
    })
    .refine((val) => {
        const enumParseResult = arrayRefinement.safeParse(val);
        return enumParseResult.success;
    });