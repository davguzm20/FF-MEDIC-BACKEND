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
import { RelationshipType, FamilyStatus } from '@prisma/client';

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
  @IsEnum(RelationshipType)
  type?: RelationshipType;

  @ValidateIf((o: UpdateFamilyHistoryRequest) => o.type === RelationshipType.OTRO)
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
