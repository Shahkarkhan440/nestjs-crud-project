import { setPasswordDTO } from '../user/dtos/user.dto';
import { UserService } from '../user/user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    updatePassword(dto: setPasswordDTO, res: Response, req: Request): Promise<object>;
}
