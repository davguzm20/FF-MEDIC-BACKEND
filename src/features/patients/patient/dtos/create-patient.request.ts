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

export class CreatePatientRequest {
  @IsEnum(DocumentType)
  documentType!: DocumentType;

  @ValidDocumentNumber()
  documentNumber!: string;

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

  @IsEnum(SexType)
  sex!: SexType;

  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @IsDateString()
  birthDate!: string;
}
