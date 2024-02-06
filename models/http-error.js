class HttpError extends Error {
    constructor (message, content, code) {
        super(message);
        this.content = content;
        this.code = code;
    }
}

module.exports = HttpError;