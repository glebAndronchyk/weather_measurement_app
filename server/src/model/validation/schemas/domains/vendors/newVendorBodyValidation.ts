import {z} from "zod";

export const newVendorBodyValidation = z.object({
    name: z.string(),
    type: z.string(),
});