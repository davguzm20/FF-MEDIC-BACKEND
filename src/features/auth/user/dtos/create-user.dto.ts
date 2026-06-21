import {
  IsString,
  IsInt,
  IsEmail,
  IsOptional,
  Min,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsInt()
  @Min(1)
  roleId!: number;

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

  @IsString()
  @IsOptional()
  @MaxLength(10)
  cmpCode?: string;

  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @Matches(/^[a-zA-Z0-9_]+$/)
  username!: string;

  @IsString()
  @MinLength(8)
  @MaxLength(250)
  password!: string;

  @IsEmail()
  @MaxLength(254)
  email!: string;
}
