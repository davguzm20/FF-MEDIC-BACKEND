import {
  IsString,
  IsInt,
  IsOptional,
  Min,
  MinLength,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
  @ApiProperty({
    description: 'Concentración del medicamento, ej. 500 mg',
  })
  concentration?: string;

  @IsInt()
  @Min(1)
  dosageFormId!: number;
}
