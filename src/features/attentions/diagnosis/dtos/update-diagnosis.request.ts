import {
  IsString,
  IsBoolean,
  MinLength,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';

export class UpdateDiagnosisRequest {
  /**
   * Código CIE-10
   * @example E11.9
   */
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(10)
  cie10!: string;

  @IsString()
  @MinLength(3)
  description!: string;

  @IsBoolean()
  isActive!: boolean;
}
