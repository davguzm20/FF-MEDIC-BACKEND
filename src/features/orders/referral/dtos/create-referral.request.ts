import { IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';
import { ExclusiveOrFields } from '@common/validators/exclusive-or-fields.validator';

@ExclusiveOrFields(['diagnosisId', 'reason'], {
  message: 'Solo debe enviarse diagnosis_id o reason, no ambos ni ninguno',
})
export class CreateReferralRequest {
  @IsInt()
  @Min(1)
  serviceId!: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  diagnosisId?: number;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  reason?: string;
}
