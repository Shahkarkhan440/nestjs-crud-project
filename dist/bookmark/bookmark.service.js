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
exports.BookmarkService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bookmark_schema_1 = require("../schema/bookmark.schema");
const helper_functions_1 = require("../utils/helper.functions");
const add_bookmark_1 = require("./dtos/add.bookmark");
const generic_bookmark_1 = require("./dtos/generic.bookmark");
const ObjectId = require('mongoose').Types.ObjectId;
let BookmarkService = class BookmarkService {
    constructor(bookmarkModel) {
        this.bookmarkModel = bookmarkModel;
    }
    isValidObjectId(id) {
        if (ObjectId.isValid(id)) {
            if ((String)(new ObjectId(id)) === id)
                return true;
            return false;
        }
        return false;
    }
    addBookmark(dto, user, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let data = Object.assign(Object.assign({}, dto), { user: { name: user.name, email: user.email, userId: user.sub } });
                const getDuplicate = yield this.bookmarkModel.findOne({ url: dto.url, "user.userId": user.sub });
                if (getDuplicate)
                    return (0, helper_functions_1.responseHandler)(res, common_1.HttpStatus.CONFLICT, 'Bookmark with this url already exists', null);
                const result = yield this.bookmarkModel.create(data);
                return (0, helper_functions_1.responseHandler)(res, common_1.HttpStatus.OK, 'Bookmark added successfully', result);
            }
            catch (error) {
                return (0, helper_functions_1.responseHandler)(res, common_1.HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error', null, error.message);
            }
        });
    }
    deleteBookmark(dto, user, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.isValidObjectId(dto.bookmarkID))
                    return (0, helper_functions_1.responseHandler)(res, common_1.HttpStatus.NOT_ACCEPTABLE, 'Invalid Id Format Provided', null);
                const getBookmark = yield this.bookmarkModel.findOneAndDelete({ _id: dto.bookmarkID, "user.userId": user.sub });
                if (!getBookmark)
                    return (0, helper_functions_1.responseHandler)(res, common_1.HttpStatus.NOT_FOUND, 'Unable to delete with this id', null);
                return (0, helper_functions_1.responseHandler)(res, common_1.HttpStatus.OK, 'Bookmark delete successfully', null);
            }
            catch (error) {
                return (0, helper_functions_1.responseHandler)(res, common_1.HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error', null, error.message);
            }
        });
    }
    viewBookmarkDetails(bookmarkID, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.isValidObjectId(bookmarkID))
                    return (0, helper_functions_1.responseHandler)(res, common_1.HttpStatus.NOT_ACCEPTABLE, 'Invalid Id Format Provided', null);
                const bookmark = yield this.bookmarkModel.findById(bookmarkID);
                if (!bookmark)
                    return (0, helper_functions_1.responseHandler)(res, common_1.HttpStatus.NOT_FOUND, 'Unable to fetch details with this id reason: invalid id', null);
                return (0, helper_functions_1.responseHandler)(res, common_1.HttpStatus.OK, 'Details fetched successfully', bookmark);
            }
            catch (error) {
                return (0, helper_functions_1.responseHandler)(res, common_1.HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error', null, error.message);
            }
        });
    }
};
__decorate([
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_bookmark_1.bookmarkDTO, Object, Object]),
    __metadata("design:returntype", Promise)
], BookmarkService.prototype, "addBookmark", null);
__decorate([
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [generic_bookmark_1.genericBookmarkDTO, Object, Object]),
    __metadata("design:returntype", Promise)
], BookmarkService.prototype, "deleteBookmark", null);
__decorate([
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BookmarkService.prototype, "viewBookmarkDetails", null);
BookmarkService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(bookmark_schema_1.Bookmark.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], BookmarkService);
exports.BookmarkService = BookmarkService;
//# sourceMappingURL=bookmark.service.js.map