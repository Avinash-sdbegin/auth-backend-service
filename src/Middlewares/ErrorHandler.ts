import { NextFunction, Request, Response } from "express";
import { INTERNAL_SERVER_ERROR } from "../Utils/Response";

const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {

    console.error(err);

    return res.status(err.statusCode || INTERNAL_SERVER_ERROR).json({
        data: {},
        success: false,
        err: err.explanation || err,
        message: err.message || "Internal Server Error"
    });
};

export default errorHandler;