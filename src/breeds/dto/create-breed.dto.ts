import { IsString, Matches } from 'class-validator';

export class CreateBreedDto {
  @IsString()
  @Matches('^[a-zA-Z]{4,}$')
  name: string;
}
