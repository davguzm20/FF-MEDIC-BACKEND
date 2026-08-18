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
import { Trim } from '@common/decorators/trim.decorator';

export class CreateFamilyHistoryRequest {
  @IsInt()
  @Min(1)
  patientId!: number;

  @IsEnum(RelationshipType)
  type!: RelationshipType;

  @ValidateIf(
    (o: CreateFamilyHistoryRequest) => o.type === RelationshipType.OTRO,
  )
  @IsNotEmpty()
  @Trim()
  @IsString()
  @MaxLength(100)
  other?: string;

  @IsEnum(FamilyStatus)
  status!: FamilyStatus;

  @IsOptional()
  @Trim()
  @IsString()
  @MaxLength(200)
  specifications?: string;
}
