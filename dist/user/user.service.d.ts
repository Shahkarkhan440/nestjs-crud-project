import { setPasswordDTO } from '../user/dtos/user.dto';
import { User } from 'src/schema/user.schema';
import { Model } from 'mongoose';
import { userObject } from 'src/common/types';
export declare class UserService {
    private readonly userModel;
    constructor(userModel: Model<User>);
    updatePassword(dto: setPasswordDTO, user: userObject, res: Response): Promise<object>;
}
