import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateExamItemRequest } from './create-exam-item.request';

export class CreateCompleteExamRequest {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateExamItemRequest)
  items!: CreateExamItemRequest[];
}
