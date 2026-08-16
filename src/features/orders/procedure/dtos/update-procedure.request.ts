import {
  IsString,
  IsOptional,
  MinLength,
  MaxLength,
  IsBoolean,
} from 'class-validator';

export class UpdateProcedureRequest {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  type!: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  category?: string;

  @IsString()
  @MinLength(3)
  @MaxLength(200)
  description!: string;

  @IsBoolean()
  isActive!: boolean;
}
