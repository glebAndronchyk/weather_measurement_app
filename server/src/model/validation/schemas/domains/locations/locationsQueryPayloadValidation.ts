import {searchParamsValidation} from "../../searchParamsValidation.js";
import {paginationParamsSchema} from "../../paginationParamsSchema.js";
import {sortingParamsValidation} from "../../sortingParamsValidation.js";
import {rectangularAreaValidation} from "../../rectangularAreaValidation.js";

export const locationsQueryPayloadValidation =
    searchParamsValidation.
            merge(paginationParamsSchema).
            merge(sortingParamsValidation).
            merge(rectangularAreaValidation({ optional: true }))
