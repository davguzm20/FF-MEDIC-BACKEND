import { IsString, IsBoolean, MinLength, MaxLength } from 'class-validator';

export class UpdateDosageFormRequest {
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  name!: string;

  @IsBoolean()
  isActive!: boolean;
}
