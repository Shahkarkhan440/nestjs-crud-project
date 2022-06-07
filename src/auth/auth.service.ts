/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { HttpStatus, HttpException, Injectable, Response, Res, Logger } from '@nestjs/common';
import { AuthDTO, LoginDTO } from './dtos/auth.dto';
import { User } from 'src/schema/user.schema';
import {  Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { responseHandler, userAccStatus } from '../utils/helper.functions'
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
 

@Injectable({})
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private jwtService: JwtService
  ) {
   }

  async login(dto: LoginDTO, @Res() res: Response): Promise<object> {
    try {
      const user: any = await this.userModel.findOne({ email: { $regex: dto.email, $options: 'i' } });
      if (!user) {
        return responseHandler(res, HttpStatus.NOT_FOUND, 'Sorry, no user is found with this email address')
      }
      if(user.status === userAccStatus.blocked){
        return responseHandler(res, HttpStatus.FORBIDDEN, 'Sorry, your account is blocked')
      }
      let passIsValid = await bcrypt.compare(dto.password, user.password)
       
      if (!passIsValid) {
        return responseHandler(res, HttpStatus.BAD_REQUEST, 'Sorry, Incorrect Password Entered')
      }
      const tokens = await this.createTokens(user.id, user.email)
      // await this.updateUserRefreshToken(user.id, tokens.refresh_token)
      let {password, ...returnUser} = user.toJSON()
      let data = {...returnUser,  accessToken: tokens.refresh_token, refreshToken: tokens.refresh_token }
      return responseHandler(res, HttpStatus.OK, 'User Login Successfully', data)
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
      const { password, ...returnUser } =  user.toJSON();
      return responseHandler(res, HttpStatus.OK, 'User created successfully', returnUser)
    } catch (error) {
      if (error.message.includes("duplicate")) {
        return responseHandler(res, HttpStatus.CONFLICT, 'User with this email already exists', null, error.message)
      }
      return responseHandler(res, HttpStatus.INTERNAL_SERVER_ERROR, 'Error in user signup', null, error.message)
    }
  }
 
 

// utility functions for this auth
  async createTokens(userId: number, email: string) { 
    const [at,rt] = await Promise.all(
      [
      this.jwtService.signAsync({
        sub: userId,
        email
      },{
        secret: 'access-token-secret',
        expiresIn: '15m'
      }),
      //refresh token
      this.jwtService.signAsync({
        sub: userId,
        email
      },{
        secret: 'refresh-token-secret',
        expiresIn: '7d'
      })
    ])
    return {
      access_token: at,
      refresh_token: rt
    }

  }

  async updateUserRefreshToken(userId: number, refreshToken:string){
    const refreshTokenHash = bcrypt.hashSync(refreshToken, 10)
    await this.userModel.updateOne({ id: userId },{$set: {refreshToken: refreshTokenHash}});
    
  }
}

