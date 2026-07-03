import { IsString, MinLength, MaxLength } from 'class-validator';

export class UpdateExamTypeRequest {
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  description!: string;
}
