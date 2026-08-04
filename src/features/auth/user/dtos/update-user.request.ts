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
import { ApiProperty } from '@nestjs/swagger';

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

  @IsOptional()
  @ValidateIf((o: { roleId: number }) => o.roleId === 2)
  @IsString()
  @MaxLength(10)
  @Matches(/^\d{6}$/)
  @ApiProperty({
    description: 'Código CMP de 6 dígitos (solo si rol Doctor)',
  })
  cmpCode?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/^[a-zA-Z0-9_]+$/)
  @ApiProperty({
    description: 'Alfanumérico: letras, números y _',
  })
  username?: string;

  @IsOptional()
  @IsString()
  @MinLength(12)
  @MaxLength(250)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
  @ApiProperty({
    description: 'Mínimo 12 caracteres, con mayúscula, minúscula y número',
  })
  password?: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(254)
  email?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
