import { StatusCodes } from "http-status-codes";

class AppError extends Error {
    explanation: string | string[];
    statusCode: number;

    constructor(
        name = "App Error",
        message = "Something went wrong",
        explanation: string | string[] = "Something went wrong",
        statusCode = StatusCodes.INTERNAL_SERVER_ERROR
    ) {
        super(message);

        this.name = name;
        this.explanation = explanation;
        this.statusCode = statusCode;
    }
}

export default AppError;