import { IsEmail, IsNotEmpty, isNotEmpty, IsString, isString } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;
    
    @IsEmail()
    @IsNotEmpty()
    email: string;
}