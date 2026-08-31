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

export class UpdatePatientRequest {
  @IsOptional()
  @IsEnum(DocumentType)
  documentType?: DocumentType;

  /** Según tipo: DNI 8 dígitos, CE 9, Pasaporte 6-20 */
  @IsOptional()
  @ValidDocumentNumber()
  @MaxLength(20)
  documentNumber?: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  @IsPersonName()
  name?: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @IsPersonName()
  paternalSurname?: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @IsPersonName()
  maternalSurname?: string;

  @IsOptional()
  @IsEnum(SexType)
  sex?: SexType;

  /**
   * Teléfono en formato E.164
   * @example +51992112553
   */
  @IsOptional()
  @IsPhoneNumber()
  @MaxLength(15)
  phone?: string;

  /** Formato YYYY-MM-DD */
  @IsOptional()
  @IsDateString()
  @IsNotFutureDate()
  birthDate?: string;
}
