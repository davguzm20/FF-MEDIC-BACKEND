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

export class CreateFamilyHistoryRequest {
  @IsInt()
  @Min(1)
  patientId!: number;

  @IsEnum(RelationshipType)
  type!: RelationshipType;

  @ValidateIf((o: CreateFamilyHistoryRequest) => o.type === RelationshipType.OTRO)
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
