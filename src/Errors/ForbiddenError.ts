import AppError from "./AppError";

export default class ForbiddenError extends AppError {
    constructor(message = "Forbidden", explanation?: any) {
        super(message, 403, explanation);
    }
}