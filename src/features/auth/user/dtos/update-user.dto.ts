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

export class UpdateUserDto {
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

  @IsString()
  @MaxLength(10)
  @IsOptional()
  cmpCode?: string;

  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @Matches(/^[a-zA-Z0-9_]+$/)
  @IsOptional()
  username?: string;

  @IsString()
  @MinLength(8)
  @MaxLength(250)
  @IsOptional()
  password?: string;

  @IsEmail()
  @MaxLength(254)
  @IsOptional()
  email?: string;
}
