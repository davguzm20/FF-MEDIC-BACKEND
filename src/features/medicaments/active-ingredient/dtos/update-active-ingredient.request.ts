import {
  IsString,
  IsBoolean,
  IsOptional,
  MinLength,
  MaxLength,
} from 'class-validator';

export class UpdateActiveIngredientRequest {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(250)
  name?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
