export default class AppError extends Error {
    statusCode: number;
    explanation: any;

    constructor(
        message: string,
        statusCode: number,
        explanation: any = message
    ) {
        super(message);

        this.statusCode = statusCode;
        this.explanation = explanation;

        Error.captureStackTrace(this, this.constructor);
    }
}