import { IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class UpdateExamItemRequest {
  @IsInt()
  @Min(1)
  procedureId!: number;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  indications?: string;
}
