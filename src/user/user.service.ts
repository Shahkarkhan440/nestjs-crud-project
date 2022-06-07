/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { HttpStatus, Injectable, Response, Res, Logger } from '@nestjs/common';
import { setPasswordDTO } from '../user/dtos/user.dto';
import { User } from 'src/schema/user.schema';
import { Document, Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { responseHandler, userAccStatus } from '../utils/helper.functions'
import * as bcrypt from 'bcryptjs'
import { userObject } from 'src/common/types';

@Injectable({})
export class UserService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) { }
    async updatePassword(dto: setPasswordDTO, user: userObject, @Res() res: Response): Promise<object> {
        try { 
            const getUser = await this.userModel.findOne({ _id: user.sub, status: userAccStatus.active })
            if (!getUser) {
                return responseHandler(res, HttpStatus.NOT_FOUND, 'Sorry, no user is found with this email address')
            }
            let passIsValid = await bcrypt.compare(dto.currentPassword, getUser.password)
            if (!passIsValid) {
                return responseHandler(res, HttpStatus.BAD_REQUEST, 'Incorrect Current Password')
            } 
            const updatedUser: object = await this.userModel.findOneAndUpdate({ _id: getUser._id }, { $set: { password: dto.password } })
            if (updatedUser['modifiedCount'] == 0) {
                return responseHandler(res, HttpStatus.NOT_MODIFIED, 'Sorry, please try again later')
            }
            return responseHandler(res, HttpStatus.OK, 'User password updated successfully')
        } catch (error) {            
            return responseHandler(res, HttpStatus.INTERNAL_SERVER_ERROR, 'Error in user password update', null, error.message)
        }
    }
}
