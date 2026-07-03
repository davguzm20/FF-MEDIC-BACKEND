import { IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class CreateExamItemRequest {
  @IsInt()
  @Min(1)
  examTypeId!: number;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  indications?: string;
}
