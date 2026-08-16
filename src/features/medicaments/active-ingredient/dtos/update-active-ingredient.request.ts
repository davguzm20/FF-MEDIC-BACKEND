import { IsString, IsBoolean, MinLength, MaxLength } from 'class-validator';

export class UpdateActiveIngredientRequest {
  @IsString()
  @MinLength(3)
  @MaxLength(250)
  name!: string;

  @IsBoolean()
  isActive!: boolean;
}
