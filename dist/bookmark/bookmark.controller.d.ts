import { userObject } from 'src/common/types';
import { BookmarkService } from './bookmark.service';
import { bookmarkDTO } from './dtos/add.bookmark';
import { genericBookmarkDTO } from './dtos/generic.bookmark';
export declare class BookmarkController {
    private readonly bookmarkService;
    constructor(bookmarkService: BookmarkService);
    addBookmark(dto: bookmarkDTO, user: userObject, res: Response): Promise<object>;
    deleteBookmark(dto: genericBookmarkDTO, user: userObject, res: Response): Promise<object>;
    viewBookmarkDetails(bookmarkID: string, res: Response): Promise<object>;
}
