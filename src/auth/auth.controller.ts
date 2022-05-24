/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Response, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO, LoginDTO } from './dtos/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  async signup(@Body() dto: AuthDTO, @Res() res: Response) {
    return await this.authService.signup(dto, res);
    // return req.body;
  }

  @Post('login')
  async login(@Body() dto: LoginDTO, @Res() res: Response) {
    return await this.authService.login(dto, res);
  }

}
