import {BaseResponseError} from "./BaseResponseError.ts";
import {ZodIssue} from "zod";
import {EStatusCode} from "../../enums/index.js";

export class ZodModelInvalidError implements BaseResponseError {
    message: string;
    code: number;
    fields: string[];

    constructor(issues: ZodIssue[]) {
        this.code = EStatusCode.BAD_REQUEST;
        this.message = "Model invalid";
        this.fields = issues.map(issue => issue.path.join('.'));
    }
}