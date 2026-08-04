import {
  IsString,
  IsInt,
  IsEmail,
  Min,
  MinLength,
  MaxLength,
  Matches,
  ValidateIf,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserRequest {
  @IsInt()
  @Min(1)
  roleId!: number;

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

  @ValidateIf((o: { roleId: number }) => o.roleId === 2)
  @IsString()
  @MaxLength(10)
  @Matches(/^\d{6}$/)
  @ApiProperty({
    description: 'Código CMP de 6 dígitos (solo si rol Doctor)',
  })
  cmpCode?: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/^[a-zA-Z0-9_]+$/)
  @ApiProperty({
    description: 'Alfanumérico: letras, números y _',
  })
  username!: string;

  @IsString()
  @MinLength(12)
  @MaxLength(250)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
  @ApiProperty({
    description: 'Mínimo 12 caracteres, con mayúscula, minúscula y número',
  })
  password!: string;

  @IsEmail()
  @MaxLength(254)
  email!: string;
}
