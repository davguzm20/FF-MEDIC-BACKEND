import {
  IsOptional,
  IsInt,
  IsArray,
  ValidateNested,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateExamItemRequest } from './update-exam-item.request';

export class UpdateCompleteExamRequest {
  @IsOptional()
  @IsInt()
  @Min(1)
  examId?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateExamItemRequest)
  items!: UpdateExamItemRequest[];
}
