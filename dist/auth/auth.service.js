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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const auth_dto_1 = require("./dtos/auth.dto");
const user_schema_1 = require("../schema/user.schema");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const helper_functions_1 = require("../utils/helper.functions");
const bcrypt = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    login(dto, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userModel.findOne({ email: { $regex: dto.email, $options: 'i' } });
                if (!user) {
                    return (0, helper_functions_1.responseHandler)(res, common_1.HttpStatus.NOT_FOUND, 'Sorry, no user is found with this email address');
                }
                if (user.status === helper_functions_1.userAccStatus.blocked) {
                    return (0, helper_functions_1.responseHandler)(res, common_1.HttpStatus.FORBIDDEN, 'Sorry, your account is blocked');
                }
                let passIsValid = yield bcrypt.compare(dto.password, user.password);
                if (!passIsValid) {
                    return (0, helper_functions_1.responseHandler)(res, common_1.HttpStatus.BAD_REQUEST, 'Sorry, Incorrect Password Entered');
                }
                const tokens = yield this.createTokens(user.id, user.email);
                let _a = user.toJSON(), { password } = _a, returnUser = __rest(_a, ["password"]);
                let data = Object.assign(Object.assign({}, returnUser), { accessToken: tokens.refresh_token, refreshToken: tokens.refresh_token });
                return (0, helper_functions_1.responseHandler)(res, common_1.HttpStatus.OK, 'User Login Successfully', data);
            }
            catch (error) {
                return (0, helper_functions_1.responseHandler)(res, common_1.HttpStatus.INTERNAL_SERVER_ERROR, 'Error in user login', null, error.message);
            }
        });
    }
    signup(dto, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                dto.password = bcrypt.hashSync(dto.password, 10),
                    dto.email = dto.email.toLowerCase();
                const newUser = yield this.userModel.create(dto);
                const user = yield newUser.save();
                const _a = user.toJSON(), { password } = _a, returnUser = __rest(_a, ["password"]);
                return (0, helper_functions_1.responseHandler)(res, common_1.HttpStatus.OK, 'User created successfully', returnUser);
            }
            catch (error) {
                if (error.message.includes("duplicate")) {
                    return (0, helper_functions_1.responseHandler)(res, common_1.HttpStatus.CONFLICT, 'User with this email already exists', null, error.message);
                }
                return (0, helper_functions_1.responseHandler)(res, common_1.HttpStatus.INTERNAL_SERVER_ERROR, 'Error in user signup', null, error.message);
            }
        });
    }
    createTokens(userId, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const [at, rt] = yield Promise.all([
                this.jwtService.signAsync({
                    sub: userId,
                    email
                }, {
                    secret: 'access-token-secret',
                    expiresIn: '15m'
                }),
                this.jwtService.signAsync({
                    sub: userId,
                    email
                }, {
                    secret: 'refresh-token-secret',
                    expiresIn: '7d'
                })
            ]);
            return {
                access_token: at,
                refresh_token: rt
            };
        });
    }
    updateUserRefreshToken(userId, refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const refreshTokenHash = bcrypt.hashSync(refreshToken, 10);
            yield this.userModel.updateOne({ id: userId }, { $set: { refreshToken: refreshTokenHash } });
        });
    }
};
__decorate([
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.LoginDTO, Object]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "login", null);
__decorate([
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.AuthDTO, Object]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "signup", null);
AuthService = __decorate([
    (0, common_1.Injectable)({}),
    __param(0, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map