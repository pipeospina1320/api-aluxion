import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @MinLength(6)
  @MaxLength(50)
  password: string;

  @IsString()
  @MinLength(1)
  fullName: string;
}
