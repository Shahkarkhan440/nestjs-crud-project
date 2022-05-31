import { AuthService } from './auth.service';
import { AuthDTO, LoginDTO } from './dtos/auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(dto: AuthDTO, res: Response): Promise<object>;
    login(dto: LoginDTO, res: Response): Promise<object>;
    logout(): Promise<void>;
}
