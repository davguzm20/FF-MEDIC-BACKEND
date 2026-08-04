import { IsInt, IsString, Min, MinLength, MaxLength } from 'class-validator';

export class CreateReferralRequest {
  @IsInt()
  @Min(1)
  serviceId!: number;

  @IsString()
  @MinLength(3)
  @MaxLength(200)
  reason!: string;
}
