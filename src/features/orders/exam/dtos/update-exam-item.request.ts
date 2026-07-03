import { IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class UpdateExamItemRequest {
  @IsOptional()
  @IsInt()
  @Min(1)
  examItemId?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  examTypeId?: number;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  indications?: string;
}
