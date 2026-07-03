import {
  IsInt,
  IsOptional,
  IsString,
  IsArray,
  MaxLength,
  Min,
} from 'class-validator';

export class CreatePrescriptionItemRequest {
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

  @IsArray()
  @IsInt({ each: true })
  @Min(1, { each: true })
  attentionDiagnosisIds!: number[];
}
