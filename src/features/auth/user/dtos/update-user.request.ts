import {
  IsString,
  IsEnum,
  IsEmail,
  IsOptional,
  MinLength,
  MaxLength,
  Matches,
  ValidateIf,
} from 'class-validator';
import { UserRole } from '@prisma/client';
import { IsPersonName } from '@common/validators/is-person-name.validator';

export class UpdateUserRequest {
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

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
  @ValidateIf((o: { role: UserRole }) => o.role === UserRole.DOCTOR)
  @IsString()
  @MaxLength(10)
  @Matches(/^\d{6}$/)
  cmpCode?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/^[a-zA-Z0-9_]+$/)
  username?: string;

  @IsOptional()
  @IsString()
  @MinLength(12)
  @MaxLength(250)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
  password?: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(254)
  email?: string;
}
