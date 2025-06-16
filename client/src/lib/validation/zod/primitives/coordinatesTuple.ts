import { z } from "zod";
import { decimalString } from "./digitString.js";

export const coordinatesTuple = z.tuple([
  decimalString,
  decimalString,
  decimalString,
]);
