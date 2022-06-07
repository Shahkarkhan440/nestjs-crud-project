import { User } from "src/schema/user.schema";
interface userwithID {
    sub: string;
    _id: string;
    id: number;
}
export declare type userObject = User & userwithID;
export {};
