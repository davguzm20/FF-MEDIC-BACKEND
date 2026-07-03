import {
  IsInt,
  IsString,
  MaxLength,
  Min,
  ValidateIf,
} from 'class-validator';
import { ExclusiveOrFields } from '@common/validators/exclusive-or-fields.validator';

export class CreateReferralRequest {
  @IsInt()
  @Min(1)
  serviceId!: number;

  @ExclusiveOrFields('reason', {
    message: 'Solo debe enviarse diagnosis_id o reason, no ambos ni ninguno',
  })
  @ValidateIf((o: CreateReferralRequest) => !o.reason)
  @IsInt()
  @Min(1)
  diagnosisId?: number;

  @ExclusiveOrFields('diagnosisId')
  @ValidateIf((o: CreateReferralRequest) => !o.diagnosisId)
  @IsString()
  @MaxLength(200)
  reason?: string;
}
