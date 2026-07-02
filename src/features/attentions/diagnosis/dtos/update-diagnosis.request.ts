import {
  IsString,
  IsBoolean,
  MinLength,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';

export class UpdateDiagnosisRequest {
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
