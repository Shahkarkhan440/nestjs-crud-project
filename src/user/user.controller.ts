/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Response, Res, } from '@nestjs/common';
import { setPasswordDTO } from '../user/dtos/user.dto';
import { UserService } from '../user/user.service';


@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }
    @Post('update-password')
    async updatePassword(@Body() dto: setPasswordDTO, @Res() res: Response) {
        console.log(dto)
        return await this.userService.updatePassword(dto, res);
    }
}

