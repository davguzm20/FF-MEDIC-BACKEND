import {
  IsString,
  IsEnum,
  IsOptional,
  MinLength,
  MaxLength,
  IsDateString,
} from 'class-validator';
import { DocumentType, SexType } from '@prisma/client';
import { ValidDocumentNumber } from '@common/validators/valid-document-number.validator';

export class CreatePatientRequest {
  @IsEnum(DocumentType)
  documentType!: DocumentType;

  @ValidDocumentNumber()
  documentNumber!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  paternalSurname!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  maternalSurname!: string;

  @IsEnum(SexType)
  sex!: SexType;

  @IsOptional()
  @IsString()
  @MaxLength(15)
  phone?: string;

  @IsDateString()
  birthDate!: string;
}
