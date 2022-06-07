import { HttpStatus, Injectable, Res, Response } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model  } from 'mongoose';
 
import { userObject } from 'src/common/types';
import { Bookmark } from 'src/schema/bookmark.schema';
import { responseHandler } from 'src/utils/helper.functions';
import { bookmarkDTO } from './dtos/add.bookmark';
import { genericBookmarkDTO } from './dtos/generic.bookmark';
const ObjectId = require('mongoose').Types.ObjectId;


@Injectable()
export class BookmarkService {
constructor(@InjectModel(Bookmark.name) private  readonly bookmarkModel: Model<Bookmark>) {}

public isValidObjectId(id: string){
    if(ObjectId.isValid(id)){
        if((String)(new ObjectId(id)) === id)
            return true;
        return false;
    }
    return false;
}

async addBookmark(dto: bookmarkDTO , user: userObject, @Res() res: Response) : Promise<object>{
    try {
        let data  = {...dto, user: {  name:user.name, email: user.email, userId: user.sub } }
        const getDuplicate = await this.bookmarkModel.findOne({ url: dto.url, "user.userId": user.sub }) 
        if(getDuplicate)  return responseHandler(res, HttpStatus.CONFLICT, 'Bookmark with this url already exists', null)
        const result = await this.bookmarkModel.create(data)
        return responseHandler(res, HttpStatus.OK, 'Bookmark added successfully', result)
    } catch (error) {
        return responseHandler(res, HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error', null, error.message)
    }
}

async deleteBookmark(dto: genericBookmarkDTO , user: userObject, @Res() res: Response) {
    try {
        if(!this.isValidObjectId(dto.bookmarkID)) return responseHandler(res, HttpStatus.NOT_ACCEPTABLE, 'Invalid Id Format Provided', null)
        const getBookmark=  await this.bookmarkModel.findOneAndDelete({_id:dto.bookmarkID, "user.userId": user.sub })
        if(!getBookmark) return responseHandler(res, HttpStatus.NOT_FOUND, 'Unable to delete with this id', null)
        return responseHandler(res, HttpStatus.OK, 'Bookmark delete successfully', null)
    } catch (error) {
        return responseHandler(res, HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error', null, error.message)
    }
}

async viewBookmarkDetails(bookmarkID:string, @Res() res:Response) {
    try {
        if(!this.isValidObjectId(bookmarkID)) return responseHandler(res, HttpStatus.NOT_ACCEPTABLE, 'Invalid Id Format Provided', null)
        const bookmark=  await this.bookmarkModel.findById(bookmarkID)
        if(!bookmark) return responseHandler(res, HttpStatus.NOT_FOUND, 'Unable to fetch details with this id reason: invalid id', null)
        return responseHandler(res, HttpStatus.OK, 'Details fetched successfully', bookmark)
    } catch (error) {
        return responseHandler(res, HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error', null, error.message)
    }
}

}
