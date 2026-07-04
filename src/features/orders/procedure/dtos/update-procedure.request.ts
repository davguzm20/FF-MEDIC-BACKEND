import {
  IsString,
  IsOptional,
  MinLength,
  MaxLength,
  IsBoolean,
} from 'class-validator';

export class UpdateProcedureRequest {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  type?: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  category?: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  description?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
