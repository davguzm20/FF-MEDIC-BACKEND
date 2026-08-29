import { IsInt, IsString, Min, MaxLength } from 'class-validator';

export class UpdateAllergyHistoryRequest {
  @IsInt()
  @Min(1)
  allergyHistoryId!: number;

  @IsString()
  @MaxLength(200)
  specifications!: string;
}
