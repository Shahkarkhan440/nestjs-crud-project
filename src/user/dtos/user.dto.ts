/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsString, Length,     IsOptional
} from 'class-validator';
import { Match } from 'src/common/decorators/match.passwords';

export class setPasswordDTO {
    @IsOptional()
    sub: string;  //for adding id/sub to type

    @IsString()
    @IsNotEmpty()
    currentPassword: string;

    @IsString()
    @IsNotEmpty()
    @Length(8)
    password: string;

    @IsString()
    @IsNotEmpty()
    @Length(8)
    @Match('password') //custom decorator can be found in ./src/common/decorators
    confirmPassword: string;
}


