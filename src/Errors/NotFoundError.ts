import AppError from "./AppError";

export default class NotFoundError extends AppError {
    constructor(message = "Resource Not Found", explanation?: any) {
        super(message, 404, explanation);
    }
}