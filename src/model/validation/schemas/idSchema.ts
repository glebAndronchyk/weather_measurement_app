import {z} from "zod";
import {digitString} from "./primitives/index.js";

export const idSchema = z.object({
    id: digitString,
})