import { AuthDTO, LoginDTO } from './dtos/auth.dto';
import { User } from 'src/schema/user.schema';
import { Model } from 'mongoose';
export declare class AuthService {
    private readonly userModel;
    constructor(userModel: Model<User>);
    login(dto: LoginDTO, res: Response): Promise<object>;
    signup(dto: AuthDTO, res: Response): Promise<object>;
}
