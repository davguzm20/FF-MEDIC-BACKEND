import {
  IsString,
  IsInt,
  IsBoolean,
  IsOptional,
  Min,
  MinLength,
  MaxLength,
} from 'class-validator';

export class UpdateMedicamentRequest {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  name?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  manufacturerId?: number;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  concentration?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  dosageFormId?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
