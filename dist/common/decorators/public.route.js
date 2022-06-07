"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPublicRoute = void 0;
const common_1 = require("@nestjs/common");
const isPublicRoute = () => (0, common_1.SetMetadata)('isPublicRoute', true);
exports.isPublicRoute = isPublicRoute;
//# sourceMappingURL=public.route.js.map