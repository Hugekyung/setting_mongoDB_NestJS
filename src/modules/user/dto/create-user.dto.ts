import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsNumber()
    age?: number;
}
