import { IsString, MinLength, MaxLength, IsOptional } from 'class-validator';

export class UpdateRoleDto {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @IsOptional()
  name?: string;
}
