import { Transform } from 'class-transformer';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  username: string;

  @IsString()
  @IsEmail()
  email: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsString()
  role: string;
}
