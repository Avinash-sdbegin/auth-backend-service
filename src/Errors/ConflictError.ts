import AppError from "./AppError";

export default class ConflictError extends AppError {
    constructor(message = "Conflict", explanation?: any) {
        super(message, 409, explanation);
    }
}