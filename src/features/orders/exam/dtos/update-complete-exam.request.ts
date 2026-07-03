import {
  IsOptional,
  IsInt,
  IsArray,
  ArrayMinSize,
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
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => UpdateExamItemRequest)
  items!: UpdateExamItemRequest[];
}
