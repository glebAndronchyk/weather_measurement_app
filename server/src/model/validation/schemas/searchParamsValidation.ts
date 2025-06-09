import {z} from "zod";
import {noTrailingSpacesString} from "./primitives/index.ts";

export const searchParamsValidation = z.object({
    search: noTrailingSpacesString.optional(),
})