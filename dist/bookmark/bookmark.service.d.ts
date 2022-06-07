import { Model } from 'mongoose';
import { userObject } from 'src/common/types';
import { Bookmark } from 'src/schema/bookmark.schema';
import { bookmarkDTO } from './dtos/add.bookmark';
import { genericBookmarkDTO } from './dtos/generic.bookmark';
export declare class BookmarkService {
    private readonly bookmarkModel;
    constructor(bookmarkModel: Model<Bookmark>);
    isValidObjectId(id: string): boolean;
    addBookmark(dto: bookmarkDTO, user: userObject, res: Response): Promise<object>;
    deleteBookmark(dto: genericBookmarkDTO, user: userObject, res: Response): Promise<object>;
    viewBookmarkDetails(bookmarkID: string, res: Response): Promise<object>;
}
