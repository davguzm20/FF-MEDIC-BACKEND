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

export class UpdateFamilyHistoryRequest {
  @IsOptional()
  @IsInt()
  @Min(1)
  familyHistoryId?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  patientId?: number;

  @IsOptional()
  @IsEnum(FamilyType)
  type?: FamilyType;

  @ValidateIf((o: UpdateFamilyHistoryRequest) => o.type === FamilyType.OTRO)
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  other?: string;

  @IsOptional()
  @IsEnum(FamilyStatus)
  status?: FamilyStatus;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  specifications?: string;
}
