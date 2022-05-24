"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = exports.User = void 0;
var mongoose_1 = require("@nestjs/mongoose");
var userStatuses;
(function (userStatuses) {
    userStatuses[userStatuses["active"] = 0] = "active";
    userStatuses[userStatuses["blocked"] = 1] = "blocked";
})(userStatuses || (userStatuses = {}));
var User = (function () {
    function User() {
    }
    __decorate([
        (0, mongoose_1.Prop)({ required: true }),
        __metadata("design:type", String)
    ], User.prototype, "name", void 0);
    __decorate([
        (0, mongoose_1.Prop)({ unique: true, required: true }),
        __metadata("design:type", String)
    ], User.prototype, "email", void 0);
    __decorate([
        (0, mongoose_1.Prop)({ required: true }),
        __metadata("design:type", String)
    ], User.prototype, "password", void 0);
    __decorate([
        (0, mongoose_1.Prop)({ default: 'active' }),
        __metadata("design:type", String)
    ], User.prototype, "status", void 0);
    User = __decorate([
        (0, mongoose_1.Schema)({
            timestamps: true,
        })
    ], User);
    return User;
}());
exports.User = User;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
//# sourceMappingURL=user.schema.js.map