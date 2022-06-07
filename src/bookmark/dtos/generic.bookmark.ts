import { IsNotEmpty,  IsString } from "class-validator";

export class genericBookmarkDTO {
    @IsString()
    @IsNotEmpty()
    bookmarkID: string
}