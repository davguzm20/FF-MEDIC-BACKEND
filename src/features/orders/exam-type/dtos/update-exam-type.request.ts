import { IsString, IsOptional, MinLength, MaxLength } from 'class-validator';

export class UpdateExamTypeRequest {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  description!: string;
}
