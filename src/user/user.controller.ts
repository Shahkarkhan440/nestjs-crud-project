/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Response, Res, Request, UseGuards, Req, } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { setPasswordDTO } from '../user/dtos/user.dto';
import { UserService } from '../user/user.service';


@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    
    @UseGuards(AuthGuard('jwt')) //this is built-in jwt guard that we can use to protect the route. but we use global
    @Post('update-password')
    async updatePassword(@Body() dto: setPasswordDTO, @Res() res: Response, @Req() req: Request) {
        const user : any = req['user']
        return await this.userService.updatePassword(dto, user, res,);
    }
}

