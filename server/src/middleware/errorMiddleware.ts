import type {ErrorRequestHandler, Request, Response, NextFunction} from "express"

export function errorHandler(err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) {
    console.error(err);
    res.status(500).json({error: "Internal Server Error"});
}
