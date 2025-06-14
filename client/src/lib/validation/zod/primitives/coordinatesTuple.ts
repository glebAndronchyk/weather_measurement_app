import { z } from "zod";
import { decimalString, digitString } from "./digitString.js";

export const coordinatesTuple = z.tuple([
  decimalString,
  decimalString,
  decimalString,
]);
