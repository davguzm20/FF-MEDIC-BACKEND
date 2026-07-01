import {
  IsInt,
  IsString,
  IsEnum,
  IsOptional,
  Min,
  MaxLength,
  ValidateIf,
  IsNotEmpty,
} from 'class-validator';
import { FamilyType, FamilyStatus } from '@prisma/client';

export class CreateFamilyHistoryRequest {
  @IsInt()
  @Min(1)
  patientId!: number;

  @IsEnum(FamilyType)
  type!: FamilyType;

  @ValidateIf((o: CreateFamilyHistoryRequest) => o.type === FamilyType.OTRO)
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  other?: string;

  @IsEnum(FamilyStatus)
  status!: FamilyStatus;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  specifications?: string;
}
