import AppError from "./ErrorHandler";
import { StatusCodes } from "http-status-codes";

class ValidationError extends AppError {
    constructor(error: any) {
        const explanation: string[] = [];

        error.errors.forEach((err: any) => {
            explanation.push(err.message);
        });

        super(
            error.name,
            "Something went wrong while signup",
            explanation,
            StatusCodes.BAD_REQUEST
        );
    }
}

export default ValidationError;