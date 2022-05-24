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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var common_1 = require("@nestjs/common");
var auth_dto_1 = require("./dtos/auth.dto");
var argon = require("argon2");
var user_schema_1 = require("../schema/user.schema");
var mongoose_1 = require("mongoose");
var mongoose_2 = require("@nestjs/mongoose");
var helper_functions_1 = require("../utils/helper.functions");
var AuthService = (function () {
    function AuthService(userModel) {
        this.userModel = userModel;
    }
    AuthService.prototype.login = function (dto, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4, this.userModel.findOne({ email: { $regex: dto.email, $options: 'i' } })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2, (0, helper_functions_1.responseHandler)(res, common_1.HttpStatus.NOT_FOUND, 'Sorry, no user is found with this email address')];
                        }
                        return [4, argon.verify(user.password, dto.password)];
                    case 2:
                        if (_a.sent()) {
                            return [2, (0, helper_functions_1.responseHandler)(res, common_1.HttpStatus.OK, 'User Login Successfully', user)];
                        }
                        else {
                            return [2, (0, helper_functions_1.responseHandler)(res, common_1.HttpStatus.BAD_REQUEST, 'Sorry, Incorrect Password Entered')];
                        }
                        return [3, 4];
                    case 3:
                        error_1 = _a.sent();
                        return [2, (0, helper_functions_1.responseHandler)(res, common_1.HttpStatus.INTERNAL_SERVER_ERROR, 'Error in user login', null, error_1.message)];
                    case 4: return [2];
                }
            });
        });
    };
    AuthService.prototype.signup = function (dto, res) {
        return __awaiter(this, void 0, void 0, function () {
            var hashPass, newUser, user, _a, password, returnUser, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        return [4, argon.hash(dto.password)];
                    case 1:
                        hashPass = _b.sent();
                        dto.password = hashPass;
                        dto.email = dto.email.toLowerCase();
                        return [4, this.userModel.create(dto)];
                    case 2:
                        newUser = _b.sent();
                        return [4, newUser.save()];
                    case 3:
                        user = _b.sent();
                        _a = user._doc, password = _a.password, returnUser = __rest(_a, ["password"]);
                        return [2, (0, helper_functions_1.responseHandler)(res, common_1.HttpStatus.OK, 'User created successfully', returnUser)];
                    case 4:
                        error_2 = _b.sent();
                        if (error_2.message.includes("duplicate")) {
                            return [2, (0, helper_functions_1.responseHandler)(res, common_1.HttpStatus.CONFLICT, 'User with this email already exists', null, error_2.message)];
                        }
                        return [2, (0, helper_functions_1.responseHandler)(res, common_1.HttpStatus.INTERNAL_SERVER_ERROR, 'Error in user signup', null, error_2.message)];
                    case 5: return [2];
                }
            });
        });
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
        __metadata("design:paramtypes", [mongoose_1.Model])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map