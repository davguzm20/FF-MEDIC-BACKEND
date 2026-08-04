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
import { ApiProperty } from '@nestjs/swagger';

export class UpdateResponsibleRequest {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  name?: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  paternalSurname?: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  maternalSurname?: string;

  @IsOptional()
  @IsEnum(RelationshipType)
  relationship?: RelationshipType;

  @ValidateIf(
    (o: UpdateResponsibleRequest) => o.relationship === RelationshipType.OTRO,
  )
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  relationshipOther?: string;

  @IsOptional()
  @IsPhoneNumber()
  @MaxLength(20)
  @ApiProperty({
    description: 'Teléfono en formato internacional con +, ej. +51992112553',
  })
  phone?: string;
}
