import {z} from "zod";
import {ESort} from "../../enums/ESort.js";

export const sortingParamsValidation = z.object({
    sort: z.nativeEnum(ESort).optional(),
    // todo: possible sql injection
    field: z.string().optional(),
});
