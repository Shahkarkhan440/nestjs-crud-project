"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRequestUser = void 0;
const common_1 = require("@nestjs/common");
exports.getRequestUser = (0, common_1.createParamDecorator)((data, context) => {
    const request = context.switchToHttp().getRequest();
    if (!data)
        return request.user;
    return request.user['data'];
});
//# sourceMappingURL=get.req.user.js.map