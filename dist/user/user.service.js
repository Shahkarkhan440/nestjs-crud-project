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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_dto_1 = require("../user/dtos/user.dto");
const user_schema_1 = require("../schema/user.schema");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const helper_functions_1 = require("../utils/helper.functions");
const bcrypt = require("bcryptjs");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    updatePassword(dto, user, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getUser = yield this.userModel.findOne({ _id: user.sub, status: helper_functions_1.userAccStatus.active });
                if (!getUser) {
                    return (0, helper_functions_1.responseHandler)(res, common_1.HttpStatus.NOT_FOUND, 'Sorry, no user is found with this email address');
                }
                let passIsValid = yield bcrypt.compare(dto.currentPassword, getUser.password);
                if (!passIsValid) {
                    return (0, helper_functions_1.responseHandler)(res, common_1.HttpStatus.BAD_REQUEST, 'Incorrect Current Password');
                }
                const updatedUser = yield this.userModel.findOneAndUpdate({ _id: getUser._id }, { $set: { password: dto.password } });
                if (updatedUser['modifiedCount'] == 0) {
                    return (0, helper_functions_1.responseHandler)(res, common_1.HttpStatus.NOT_MODIFIED, 'Sorry, please try again later');
                }
                return (0, helper_functions_1.responseHandler)(res, common_1.HttpStatus.OK, 'User password updated successfully');
            }
            catch (error) {
                return (0, helper_functions_1.responseHandler)(res, common_1.HttpStatus.INTERNAL_SERVER_ERROR, 'Error in user password update', null, error.message);
            }
        });
    }
};
__decorate([
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.setPasswordDTO, Object, Object]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "updatePassword", null);
UserService = __decorate([
    (0, common_1.Injectable)({}),
    __param(0, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map