"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./user/user.module");
const bookmark_module_1 = require("./bookmark/bookmark.module");
const logger_middleware_1 = require("./midllewares/logger.middleware");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(logger_middleware_1.LogsMiddleware).forRoutes('*');
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            bookmark_module_1.BookmarkModule,
            mongoose_1.MongooseModule.forRoot('mongodb://localhost:27017/bookmark'),
            config_1.ConfigModule.forRoot(),
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map