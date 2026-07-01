import { IsString, MinLength, MaxLength } from 'class-validator';

export class CreateActiveIngredientRequest {
  @IsString()
  @MinLength(3)
  @MaxLength(250)
  name!: string;
}
