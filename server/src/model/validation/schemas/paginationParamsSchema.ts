import { z } from "zod";
import {digitString} from "./primitives/index.js";

export const paginationParamsSchema = z.object({
    take: digitString,
    skip: digitString,
});
