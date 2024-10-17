class ApiError extends Error {
    code: number
    errors: any
    override stack?: string
    constructor(code: number, message: string, errors: any = [], stack = "") {
        super(message)
        this.code = code
        this.errors = errors
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export default ApiError