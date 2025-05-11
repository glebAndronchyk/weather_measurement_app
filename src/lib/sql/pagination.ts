import {PaginationParams} from "../../model/controllers/PaginationParams.js";

export
const pagination = (obj: PaginationParams) => {
    return `
                LIMIT CASE WHEN ${obj.take}::integer IS NULL THEN NULL ELSE ${obj.take} END
                OFFSET CASE WHEN ${obj.skip}::integer IS NULL THEN 0 ELSE ${obj.skip} END
    `
};
