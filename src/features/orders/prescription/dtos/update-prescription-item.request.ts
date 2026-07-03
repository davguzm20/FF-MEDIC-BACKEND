import {
  IsInt,
  IsOptional,
  IsString,
  IsArray,
  MaxLength,
  Min,
} from 'class-validator';

export class UpdatePrescriptionItemRequest {
  @IsOptional()
  @IsInt()
  @Min(1)
  prescriptionItemId?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  medicamentId?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  quantity?: number;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  indications?: string;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Min(1, { each: true })
  attentionDiagnosisIds?: number[];
}
