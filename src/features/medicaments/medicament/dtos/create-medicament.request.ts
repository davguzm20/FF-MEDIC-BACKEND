import {
  IsString,
  IsInt,
  IsOptional,
  Min,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateMedicamentRequest {
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  name!: string;

  @IsInt()
  @Min(1)
  manufacturerId!: number;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  concentration?: string;

  @IsInt()
  @Min(1)
  dosageFormId!: number;
}
