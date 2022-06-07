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
exports.BookmarkSchema = exports.Bookmark = exports.categories = exports.bookmarkStatuses = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_validator_1 = require("class-validator");
var bookmarkStatuses;
(function (bookmarkStatuses) {
    bookmarkStatuses[bookmarkStatuses["disabled"] = 0] = "disabled";
    bookmarkStatuses[bookmarkStatuses["active"] = 1] = "active";
})(bookmarkStatuses = exports.bookmarkStatuses || (exports.bookmarkStatuses = {}));
var categories;
(function (categories) {
    categories[categories["politics"] = 0] = "politics";
    categories[categories["general"] = 1] = "general";
    categories[categories["sports"] = 2] = "sports";
})(categories = exports.categories || (exports.categories = {}));
let Bookmark = class Bookmark {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Bookmark.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ requried: true }),
    __metadata("design:type", String)
], Bookmark.prototype, "url", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    (0, class_validator_1.IsEnum)(categories),
    __metadata("design:type", String)
], Bookmark.prototype, "category", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: {} }),
    __metadata("design:type", Object)
], Bookmark.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: bookmarkStatuses.active }),
    (0, class_validator_1.IsEnum)(bookmarkStatuses),
    __metadata("design:type", String)
], Bookmark.prototype, "status", void 0);
Bookmark = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
    })
], Bookmark);
exports.Bookmark = Bookmark;
exports.BookmarkSchema = mongoose_1.SchemaFactory.createForClass(Bookmark);
//# sourceMappingURL=bookmark.schema.js.map