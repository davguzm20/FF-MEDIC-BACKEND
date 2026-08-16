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
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  name!: string;

  @IsInt()
  @Min(1)
  manufacturerId!: number;

  /**
   * Concentración del medicamento
   * @example "500 mg"
   */
  @IsOptional()
  @IsString()
  @MaxLength(50)
  concentration?: string;

  @IsInt()
  @Min(1)
  dosageFormId!: number;

  @IsBoolean()
  isActive!: boolean;
}
