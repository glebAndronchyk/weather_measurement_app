import {z} from "zod";

export const noTrailingSpacesString = z.string().regex(/^.*[^\s]$/);
