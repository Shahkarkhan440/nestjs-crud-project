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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookmarkController = void 0;
const common_1 = require("@nestjs/common");
const get_req_user_1 = require("../common/decorators/get.req.user");
const public_route_1 = require("../common/decorators/public.route");
const bookmark_service_1 = require("./bookmark.service");
const add_bookmark_1 = require("./dtos/add.bookmark");
const generic_bookmark_1 = require("./dtos/generic.bookmark");
let BookmarkController = class BookmarkController {
    constructor(bookmarkService) {
        this.bookmarkService = bookmarkService;
    }
    addBookmark(dto, user, res) {
        return this.bookmarkService.addBookmark(dto, user, res);
    }
    deleteBookmark(dto, user, res) {
        return this.bookmarkService.deleteBookmark(dto, user, res);
    }
    viewBookmarkDetails(bookmarkID, res) {
        return this.bookmarkService.viewBookmarkDetails(bookmarkID, res);
    }
};
__decorate([
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_req_user_1.getRequestUser)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_bookmark_1.bookmarkDTO, Object, Object]),
    __metadata("design:returntype", void 0)
], BookmarkController.prototype, "addBookmark", null);
__decorate([
    (0, common_1.Delete)('delete'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_req_user_1.getRequestUser)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [generic_bookmark_1.genericBookmarkDTO, Object, Object]),
    __metadata("design:returntype", void 0)
], BookmarkController.prototype, "deleteBookmark", null);
__decorate([
    (0, public_route_1.isPublicRoute)(),
    (0, common_1.Get)('view/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], BookmarkController.prototype, "viewBookmarkDetails", null);
BookmarkController = __decorate([
    (0, common_1.Controller)('bookmark'),
    __metadata("design:paramtypes", [bookmark_service_1.BookmarkService])
], BookmarkController);
exports.BookmarkController = BookmarkController;
//# sourceMappingURL=bookmark.controller.js.map