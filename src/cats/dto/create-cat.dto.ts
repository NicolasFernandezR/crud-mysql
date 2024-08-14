import {
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  Matches,
  Max,
  MinLength,
} from 'class-validator';

export class CreateCatDto {
  @IsString()
  @MinLength(3)
  @Matches('^[a-zA-Z]{4,}$')
  name: string;

  @IsInt()
  @IsPositive()
  @Max(25)
  age: number;

  @IsString()
  @IsOptional()
  breed?: string;
}
