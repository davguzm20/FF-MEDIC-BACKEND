import {
  IsString,
  IsEnum,
  IsOptional,
  MinLength,
  MaxLength,
  ValidateIf,
  IsNotEmpty,
  IsPhoneNumber,
} from 'class-validator';
import { RelationshipType } from '@prisma/client';

export class CreateResponsibleRequest {
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  name!: string;

  @IsString()
  @MinLength(3)
  @MaxLength(50)
  paternalSurname!: string;

  @IsString()
  @MinLength(3)
  @MaxLength(50)
  maternalSurname!: string;

  @IsEnum(RelationshipType)
  relationship!: RelationshipType;

  @ValidateIf(
    (o: CreateResponsibleRequest) => o.relationship === RelationshipType.OTRO,
  )
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  relationshipOther?: string;

  /**
   * Teléfono en formato E.164
   * @example +51992112553
   */
  @IsOptional()
  @IsPhoneNumber()
  @MaxLength(20)
  phone?: string;
}
