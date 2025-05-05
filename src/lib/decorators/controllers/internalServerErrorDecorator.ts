import {RequestHandler} from "express";

export const internalServerErrorDecorator = <TParams>(callback: RequestHandler<TParams>): RequestHandler<TParams> => {
    return (req, res, next) => {
        Promise.resolve(callback(req, res, next))
            .catch(next)
    }
}
