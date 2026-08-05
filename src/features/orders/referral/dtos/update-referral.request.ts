import {
  IsInt,
  IsOptional,
  IsString,
  Min,
  MinLength,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateReferralRequest {
  @IsOptional()
  @IsInt()
  @Min(1)
  referralId?: number;

  @IsInt()
  @Min(1)
  serviceId!: number;

  @IsString()
  @MinLength(3)
  @MaxLength(200)
  @ApiProperty({
    description: 'Motivo de la interconsulta',
  })
  reason!: string;
}
