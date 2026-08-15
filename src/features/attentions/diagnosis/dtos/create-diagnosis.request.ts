import { IsString, MinLength, MaxLength, IsNotEmpty } from 'class-validator';

export class CreateDiagnosisRequest {
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
}
