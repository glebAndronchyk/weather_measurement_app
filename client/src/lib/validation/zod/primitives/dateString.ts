import {z} from "zod";

export const dateString = z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format, expected yyyy-mm-dd")
    .transform((s: string) => new Date(s).toISOString());
