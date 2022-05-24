/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { HttpStatus, HttpException, Injectable, Response, Res, Logger } from '@nestjs/common';
import { setPasswordDTO } from '../user/dtos/user.dto';
import * as argon from 'argon2';
import { User } from 'src/schema/user.schema';
import { Document, Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { responseHandler } from '../utils/helper.functions'

@Injectable({})
export class UserService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) { }
    async updatePassword(dto: setPasswordDTO, @Res() res: Response,): Promise<object> {
        try {
            const getUser = await this.userModel.findOne({ email: { $regex: dto.email, $options: 'i' } })
            if (!getUser) {
                return responseHandler(res, HttpStatus.NOT_FOUND, 'Sorry, no user is found with this email address')
            }
            if (await argon.verify(getUser.password, dto.currentPassword)) {
                const updatedUser: object = await this.userModel.findOneAndUpdate({ _id: getUser._id }, { $set: { password: dto.password } })
                if (updatedUser['modifiedCount'] == 0) {
                    return responseHandler(res, HttpStatus.NOT_MODIFIED, 'Sorry, please try again later')
                }
                return responseHandler(res, HttpStatus.OK, 'User password updated successfully')
            } else {
                return responseHandler(res, HttpStatus.BAD_REQUEST, 'Invalid Current Password')
            }
        } catch (error) {
            return responseHandler(res, HttpStatus.INTERNAL_SERVER_ERROR, 'Error in user password update', null, error.message)

        }
    }
}
