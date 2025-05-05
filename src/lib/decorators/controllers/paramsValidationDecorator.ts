import {RequestHandler} from "express";
import {ZodSchema} from "zod";
import {BaseResponse, ZodModelInvalidError} from "../../../model/controllers/errors/index.ts";

export const paramsValidationDecorator = <TParams>(callback: RequestHandler<TParams>, schema: ZodSchema): RequestHandler<TParams> => {
    return (req, res, next) => {
        const { success, error, data } = schema.safeParse(req.params);

        if (!success) {
            const baseResponse = new BaseResponse();
            baseResponse.setError(new ZodModelInvalidError(error.issues))
            const responseDto = baseResponse.toDTO();

            res.status(responseDto.error.code).json(responseDto);
            return;
        }

        Object.defineProperty(req, 'params', {
            get(): any {
                return data;
            }
        });
        return callback(req, res, next);
    }
}
