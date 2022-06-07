/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Response, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO, LoginDTO } from './dtos/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
   signup(@Body() dto: AuthDTO, @Res() res: Response) {
    return  this.authService.signup(dto, res);
  }

  @Post('login')
   login(@Body() dto: LoginDTO, @Res() res: Response) {
    return  this.authService.login(dto, res);
  }

}
