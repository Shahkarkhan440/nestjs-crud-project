import { IsNotEmpty, IsString } from "class-validator";


export class bookmarkDTO {

    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    url: string

    @IsString()
    @IsNotEmpty()
    category: string

}