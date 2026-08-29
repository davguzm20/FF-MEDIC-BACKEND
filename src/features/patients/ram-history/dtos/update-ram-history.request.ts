import { IsInt, IsString, Min, MaxLength } from 'class-validator';

export class UpdateRamHistoryRequest {
  @IsInt()
  @Min(1)
  ramHistoryId!: number;

  @IsString()
  @MaxLength(200)
  specifications!: string;
}
