import { IsInt, IsString, Min, MinLength, MaxLength } from 'class-validator';

export class UpdateReferralRequest {
  @IsInt()
  @Min(1)
  serviceId!: number;

  /** Motivo de la interconsulta */
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  reason!: string;
}
