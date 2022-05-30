/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { HttpStatus, HttpException, Injectable, Response, Res, Logger } from '@nestjs/common';
import { AuthDTO, LoginDTO } from './dtos/auth.dto';
import { User } from 'src/schema/user.schema';
import { Document, Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { responseHandler } from '../utils/helper.functions'
import bcrypt from 'bcryptjs';



@Injectable({})
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,

  ) { }

  async login(dto: LoginDTO, @Res() res: Response): Promise<object> {
    try {
      const user = await this.userModel.findOne({ email: { $regex: dto.email, $options: 'i' } });
      if (!user) {
        return responseHandler(res, HttpStatus.NOT_FOUND, 'Sorry, no user is found with this email address')
      }
      let passIsValid = await bcrypt.compare(dto.password, user.password)
      if (passIsValid) {
        return responseHandler(res, HttpStatus.OK, 'User Login Successfully', user)
      } else {
        return responseHandler(res, HttpStatus.BAD_REQUEST, 'Sorry, Incorrect Password Entered')
      }
    } catch (error) {
      return responseHandler(res, HttpStatus.INTERNAL_SERVER_ERROR, 'Error in user login', null, error.message)
    }
  }

  //register function
  async signup(dto: AuthDTO, @Res() res: Response): Promise<object> {
    try {
      dto.password = bcrypt.hashSync(dto.password, 10),
      dto.email = dto.email.toLowerCase()
      const newUser = await this.userModel.create(dto)
      const user: any = await newUser.save();
      const { password, ...returnUser } = user._doc;
      return responseHandler(res, HttpStatus.OK, 'User created successfully', returnUser)
    } catch (error) {
      if (error.message.includes("duplicate")) {
        return responseHandler(res, HttpStatus.CONFLICT, 'User with this email already exists', null, error.message)
      }
      return responseHandler(res, HttpStatus.INTERNAL_SERVER_ERROR, 'Error in user signup', null, error.message)
    }
  }




}

