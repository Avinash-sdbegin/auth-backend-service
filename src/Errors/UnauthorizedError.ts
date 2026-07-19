import AppError from "./AppError";

export default class UnauthorizedError extends AppError {
    constructor(message = "Unauthorized", explanation?: any) {
        super(message, 401, explanation);
    }
}