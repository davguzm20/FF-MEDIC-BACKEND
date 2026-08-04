import {
  IsString,
  IsEnum,
  IsOptional,
  MinLength,
  MaxLength,
  IsDateString,
  IsPhoneNumber,
} from 'class-validator';
import { DocumentType, SexType } from '@prisma/client';
import { ValidDocumentNumber } from '@common/validators/valid-document-number.validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePatientRequest {
  @IsOptional()
  @IsEnum(DocumentType)
  documentType?: DocumentType;

  @IsOptional()
  @ValidDocumentNumber()
  @MaxLength(20)
  @ApiProperty({
    description: 'Según tipo: DNI 8 dígitos, CE 9, Pasaporte 6-20',
  })
  documentNumber?: string;

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
  @IsEnum(SexType)
  sex?: SexType;

  @IsOptional()
  @IsPhoneNumber()
  @MaxLength(15)
  @ApiProperty({
    description: 'Teléfono en formato internacional con +, ej. +51992112553',
  })
  phone?: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ description: 'Formato YYYY-MM-DD' })
  birthDate?: string;
}
