import {z} from "zod";
import {digitString} from "./digitString.js";

export const coordinatesTuple = z.tuple([digitString, digitString, digitString]);