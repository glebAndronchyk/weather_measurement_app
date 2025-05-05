import {z} from "zod";

export const digitString = z.string().regex(/^\d+$/).transform((s: string) => parseInt(s));
