import { AnyZodObject, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";
import { BAD_REQUEST } from "../Utils/Response";

const validate = (schema: AnyZodObject) => {
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            req.body = await schema.parseAsync(req.body);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(BAD_REQUEST).json({
                    data: {},
                    success: false,
                    err: error.issues,
                    message: "Validation Failed",
                });
            }

            return res.status(BAD_REQUEST).json({
                data: {},
                success: false,
                err: error,
                message: "Something went wrong",
            });
        }
    };
};

export default validate;