import { z } from "zod";

export const jsonString = z.string().refine((entry) => {
  try {
    JSON.parse(entry);
    return true;
  } catch {
    return false;
  }
});
