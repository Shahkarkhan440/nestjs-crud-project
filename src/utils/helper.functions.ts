/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/ban-types */
export function responseHandler(res, status: Number, message: String, data?: Object, error?: String,): object {
    if (status === 200 || status === 201) {
        return res.status(status).json({ success: true, statusCode: status, message: message, data: data ? data : null });
    } else if (process.env.NODE_ENV === 'dev') {
        return res.status(status).json({ success: false, statusCode: status, message: message, data: null, error: error });
    } else {
        return res.status(status).json({ success: false, statusCode: status, message: message, data: null, error: error });
    }
}
