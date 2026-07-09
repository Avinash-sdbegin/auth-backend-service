import { Request, Response, NextFunction } from "express";
import { BAD_REQUEST } from "../Utils/Response";

const authReqValidate = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log(req.body);

    if (!req.body || !req.body.email || !req.body.password) {
        return res.status(BAD_REQUEST).json({
            data: {},
            success: false,
            err: "invalid credential",
            message: "missing email or password",
        });
    }

    next();
};

const roleReqValidate = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.query.id) {
        return res.status(BAD_REQUEST).json({
            data: {},
            success: false,
            err: "invalid credential",
            message: "missing userId",
        });
    }

    next();
};

export {
    authReqValidate,
    roleReqValidate
};