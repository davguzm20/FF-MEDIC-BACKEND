import {
  IsString,
  IsBoolean,
  MinLength,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDiagnosisRequest {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(10)
  @ApiProperty({
    description: 'Código CIE-10, ej. E11.9',
  })
  cie10!: string;

  @IsString()
  @MinLength(3)
  description!: string;

  @IsBoolean()
  isActive!: boolean;
}
