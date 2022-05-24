/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsString, Length, } from 'class-validator';

export class setPasswordDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string;

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
    confirmPassword: string;
}
