import { AuthDTO, LoginDTO } from './dtos/auth.dto';
import { User } from 'src/schema/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly userModel;
    private jwtService;
    constructor(userModel: Model<User>, jwtService: JwtService);
    login(dto: LoginDTO, res: Response): Promise<object>;
    signup(dto: AuthDTO, res: Response): Promise<object>;
    createTokens(userId: number, email: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    updateUserRefreshToken(userId: number, refreshToken: string): Promise<void>;
}
