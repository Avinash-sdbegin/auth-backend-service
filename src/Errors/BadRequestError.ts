import AppError from "./AppError";

export default class BadRequestError extends AppError {
    constructor(message = "Bad Request", explanation?: any) {
        super(message, 400, explanation);
    }
}