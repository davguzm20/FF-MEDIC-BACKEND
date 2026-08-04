import {
  IsString,
  IsInt,
  IsBoolean,
  IsOptional,
  Min,
  MinLength,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
  @MaxLength(50)
  @ApiProperty({
    description: 'Concentración del medicamento, ej. 500 mg',
  })
  concentration?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  dosageFormId?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
