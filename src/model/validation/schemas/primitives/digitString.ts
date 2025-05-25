import {z} from "zod";

export const digitString = z.string().regex(/^-?\d+(\.\d+)?$/).transform((s: string) => parseInt(s));
export const decimalString = z.string()
    .regex(/^-?\d+(\.\d+)?$/)
    .transform((s: string) => parseFloat(s));