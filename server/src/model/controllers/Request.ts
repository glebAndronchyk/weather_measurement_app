import {RequestHandler} from "express";

export type OnlyQueryRequest<TQ> = RequestHandler<{}, {}, {}, TQ>;
export type OnlyBodyRequest<TB> = RequestHandler<{}, {}, TB, {}>;