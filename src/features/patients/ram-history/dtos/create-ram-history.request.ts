import { IsInt, IsString, Min, MaxLength } from 'class-validator';
import { Trim } from '@common/decorators/trim.decorator';

export class CreateRamHistoryRequest {
  @IsInt()
  @Min(1)
  patientId!: number;

  @IsString()
  @Trim()
  @MaxLength(200)
  specifications!: string;
}
