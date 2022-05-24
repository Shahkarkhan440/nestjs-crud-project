"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseHandler = void 0;
function responseHandler(res, status, message, data, error) {
    if (status === 200 || status === 201) {
        return res.status(status).json({ success: true, statusCode: status, message: message, data: data ? data : null });
    }
    else if (process.env.NODE_ENV === 'dev') {
        return res.status(status).json({ success: false, statusCode: status, message: message, data: null, error: error });
    }
    else {
        return res.status(status).json({ success: false, statusCode: status, message: message, data: null, error: error });
    }
}
exports.responseHandler = responseHandler;
//# sourceMappingURL=helper.functions.js.map