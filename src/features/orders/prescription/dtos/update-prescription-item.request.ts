import {
  IsInt,
  IsOptional,
  IsString,
  IsArray,
  MaxLength,
  Min,
} from 'class-validator';

export class UpdatePrescriptionItemRequest {
  @IsInt()
  @Min(1)
  medicamentId!: number;

  @IsInt()
  @Min(1)
  quantity!: number;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  indications?: string;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  diagnosisIds?: number[];
}
