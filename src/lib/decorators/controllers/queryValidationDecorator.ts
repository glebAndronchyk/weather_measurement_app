import {RequestHandler} from "express";
import {ZodSchema} from "zod";
import {BaseResponse, ZodModelInvalidError} from "../../../model/controllers/errors/index.js";

export const queryValidationDecorator = (callback: RequestHandler<{}, {}, {}, {}>, schema: ZodSchema): RequestHandler<{}, {}, {}, {}> => {
    return (req, res, next) => {
        const { success, error, data } = schema.safeParse(req.query);

        if (!success) {
            const baseResponse = new BaseResponse();
            baseResponse.setError(new ZodModelInvalidError(error.issues))
            const responseDto = baseResponse.toDTO();

            res.status(responseDto.error.code).json(responseDto as never);
            return;
        }

        Object.defineProperty(req, 'query', {
            get(): any {
                return {
                    ...(data as object),
                    _validated: true,
                };
            }
        });
        return callback(req, res, next);
    }
}
