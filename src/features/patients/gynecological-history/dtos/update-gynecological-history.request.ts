import {
  IsInt,
  IsString,
  IsEnum,
  IsOptional,
  Min,
  MaxLength,
  ValidateIf,
  IsNotEmpty,
  IsDateString,
} from 'class-validator';
import { ContraceptiveMethod } from '@prisma/client';

export class UpdateGynecologicalHistoryRequest {
  @IsOptional()
  @IsInt()
  @Min(1)
  patientId?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  menarche?: number;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  menstrualCycle?: string;

  @IsOptional()
  @IsDateString()
  lastMenstrualPeriod?: string;

  @IsOptional()
  @IsEnum(ContraceptiveMethod)
  contraceptiveMethod?: ContraceptiveMethod;

  @ValidateIf(
    (o: UpdateGynecologicalHistoryRequest) =>
      o.contraceptiveMethod === ContraceptiveMethod.OTRO,
  )
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  other?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  gestations?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  parity?: number;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  orientation?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  andria?: number;

  @IsOptional()
  @IsDateString()
  isa?: string;

  @IsOptional()
  @IsDateString()
  lsa?: string;
}
