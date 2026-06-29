import {
  IsString,
  IsBoolean,
  IsOptional,
  MinLength,
  MaxLength,
} from 'class-validator';

export class UpdateRoleRequest {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
