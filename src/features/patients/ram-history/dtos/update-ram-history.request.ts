import { IsInt, IsString, IsOptional, Min, MaxLength } from 'class-validator';

export class UpdateRamHistoryRequest {
  @IsInt()
  @Min(1)
  activeIngredientId!: number;

  @IsInt()
  @Min(1)
  diagnosisId!: number;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  specifications?: string;
}
