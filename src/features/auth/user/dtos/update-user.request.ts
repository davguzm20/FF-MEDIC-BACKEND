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
  @IsInt()
  @Min(1)
  @IsOptional()
  roleId?: number;

  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @IsOptional()
  name?: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @IsOptional()
  paternalSurname?: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @IsOptional()
  maternalSurname?: string;

  @ValidateIf((o: { roleId: number }) => o.roleId === 2)
  @IsString()
  @Matches(/^\d{6}$/)
  @IsOptional()
  cmpCode?: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/^[a-zA-Z0-9_]+$/)
  @IsOptional()
  username?: string;

  @IsString()
  @MinLength(12)
  @MaxLength(250)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/)
  @IsOptional()
  password?: string;

  @IsEmail()
  @MaxLength(254)
  @IsOptional()
  email?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
