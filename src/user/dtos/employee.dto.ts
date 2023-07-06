import {IsString, IsNotEmpty, IsEmail, Matches, IsOptional} from 'class-validator'

export class SignupDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @Matches(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/, 
    {message: 'phone must be a valid phone number'})
    phone: string;

    @IsString()
    @IsNotEmpty()
    designation: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}

export class SigninDto {
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}

export class UpdateEmployeeDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
    @Matches(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/, 
    {message: 'phone must be a valid phone number'})
    phone: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    designation: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    password: string;   
}