/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsString, Length, MaxLength } from 'class-validator';

export class AuthDTO {

    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @Length(8)
    password: string;
}

export class LoginDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}