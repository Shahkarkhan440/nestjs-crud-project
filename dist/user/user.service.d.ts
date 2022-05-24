import { setPasswordDTO } from '../user/dtos/user.dto';
import { User } from 'src/schema/user.schema';
import { Model } from 'mongoose';
export declare class UserService {
    private readonly userModel;
    constructor(userModel: Model<User>);
    updatePassword(dto: setPasswordDTO, res: Response): Promise<object>;
}
