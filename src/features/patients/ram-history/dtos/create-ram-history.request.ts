import { IsInt, IsString, IsOptional, Min, MaxLength } from 'class-validator';
import { Trim } from '@common/decorators/trim.decorator';

export class CreateRamHistoryRequest {
  @IsInt()
  @Min(1)
  patientId!: number;

  @IsInt()
  @Min(1)
  activeIngredientId!: number;

  @IsInt()
  @Min(1)
  diagnosisId!: number;

  @IsOptional()
  @Trim()
  @IsString()
  @MaxLength(200)
  specifications?: string;
}
