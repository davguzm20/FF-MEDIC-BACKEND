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
import { ContraceptiveMethod, OrientationType } from '@prisma/client';
import { IsNotFutureDate } from '@common/validators/not-future-date.validator';

export class UpdateGynecologicalHistoryRequest {
  @IsOptional()
  @IsInt()
  @Min(1)
  gynecologicalHistoryId?: number;

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
  @IsNotFutureDate()
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
  contraceptiveMethodOther?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  gestations?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  termBirths?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  pretermBirths?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  abortions?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  livingChildren?: number;

  @IsOptional()
  @IsEnum(OrientationType)
  orientation?: OrientationType;

  @ValidateIf(
    (o: UpdateGynecologicalHistoryRequest) =>
      o.orientation === OrientationType.OTRO,
  )
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  orientationOther?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  sexualPartners?: number;

  @IsOptional()
  @IsString()
  @MaxLength(250)
  isa?: string;

  @IsOptional()
  @IsString()
  @MaxLength(250)
  lsa?: string;
}
