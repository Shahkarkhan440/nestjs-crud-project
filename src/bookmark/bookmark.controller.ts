import { Body, Controller, Delete, Get, Param, Post, Res, Response } from '@nestjs/common';
import { getRequestUser } from 'src/common/decorators/get.req.user';
import { isPublicRoute } from 'src/common/decorators/public.route';
import { userObject } from 'src/common/types';
import { BookmarkService } from './bookmark.service';
import { bookmarkDTO } from './dtos/add.bookmark';
import { genericBookmarkDTO } from './dtos/generic.bookmark';

@Controller('bookmark')
export class BookmarkController {
    constructor(private readonly bookmarkService: BookmarkService){}

    @Post('add')
     addBookmark(@Body() dto: bookmarkDTO, @getRequestUser() user: userObject,  @Res() res: Response){
        return this.bookmarkService.addBookmark(dto,user,res)
    }

    @Delete('delete')
    deleteBookmark(@Body() dto: genericBookmarkDTO, @getRequestUser() user: userObject, @Res() res:Response){
        return this.bookmarkService.deleteBookmark(dto,user,res)
    }

    @isPublicRoute()
    @Get('view/:id')
    viewBookmarkDetails(@Param('id') bookmarkID: string,  @Res() res: Response){
        return this.bookmarkService.viewBookmarkDetails(bookmarkID, res )
    }

}
