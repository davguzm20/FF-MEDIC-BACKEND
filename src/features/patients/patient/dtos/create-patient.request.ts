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
import { IsNotFutureDate } from '@common/validators/not-future-date.validator';
import { IsPersonName } from '@common/validators/is-person-name.validator';

export class CreatePatientRequest {
  @IsEnum(DocumentType)
  documentType!: DocumentType;

  /** Según tipo: DNI 8 dígitos, CE 9, Pasaporte 6-20 */
  @ValidDocumentNumber()
  @MaxLength(20)
  documentNumber!: string;

  @IsString()
  @MinLength(3)
  @MaxLength(100)
  @IsPersonName()
  name!: string;

  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @IsPersonName()
  paternalSurname!: string;

  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @IsPersonName()
  maternalSurname!: string;

  @IsEnum(SexType)
  sex!: SexType;

  /**
   * Teléfono en formato E.164
   * @example +51992112553
   */
  @IsOptional()
  @IsPhoneNumber()
  @MaxLength(15)
  phone?: string;

  /** Formato YYYY-MM-DD */
  @IsDateString()
  @IsNotFutureDate()
  birthDate!: string;
}
