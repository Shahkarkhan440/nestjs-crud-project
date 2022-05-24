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
exports.LoginDTO = exports.AuthDTO = void 0;
var class_validator_1 = require("class-validator");
var AuthDTO = (function () {
    function AuthDTO() {
    }
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.MaxLength)(30),
        __metadata("design:type", String)
    ], AuthDTO.prototype, "name", void 0);
    __decorate([
        (0, class_validator_1.IsEmail)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], AuthDTO.prototype, "email", void 0);
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.Length)(8),
        __metadata("design:type", String)
    ], AuthDTO.prototype, "password", void 0);
    return AuthDTO;
}());
exports.AuthDTO = AuthDTO;
var LoginDTO = (function () {
    function LoginDTO() {
    }
    __decorate([
        (0, class_validator_1.IsEmail)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], LoginDTO.prototype, "email", void 0);
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], LoginDTO.prototype, "password", void 0);
    return LoginDTO;
}());
exports.LoginDTO = LoginDTO;
//# sourceMappingURL=auth.dto.js.map