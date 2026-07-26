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
  @Matches(/^\d{6}$/)
  cmpCode?: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/^[a-zA-Z0-9_]+$/)
  username!: string;

  @IsString()
  @MinLength(12)
  @MaxLength(250)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
  password!: string;

  @IsEmail()
  @MaxLength(254)
  email!: string;
}
