
import { User } from "src/schema/user.schema"

//user type
interface userwithID {
    sub: string,
    _id: string,
    id: number
}
export type userObject = User & userwithID
//end of user type

