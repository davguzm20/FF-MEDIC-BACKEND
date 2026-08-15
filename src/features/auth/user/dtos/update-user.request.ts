import {
  IsString,
  IsInt,
  IsBoolean,
  IsEmail,
  IsOptional,
  Min,
  MinLength,
  MaxLength,
  Matches,
  ValidateIf,
} from 'class-validator';

export class UpdateUserRequest {
  @IsOptional()
  @IsInt()
  @Min(1)
  roleId?: number;

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

  /** Código CMP de 6 dígitos (solo si rol Doctor) */
  @IsOptional()
  @ValidateIf((o: { roleId: number }) => o.roleId === 2)
  @IsString()
  @MaxLength(10)
  @Matches(/^\d{6}$/)
  cmpCode?: string;

  /** Alfanumérico: letras, números y _ */
  @IsOptional()
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/^[a-zA-Z0-9_]+$/)
  username?: string;

  /** Mínimo 12 caracteres, con mayúscula, minúscula y número */
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

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
