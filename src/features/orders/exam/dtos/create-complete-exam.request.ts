import { IsArray, ArrayMinSize, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateExamItemRequest } from './create-exam-item.request';

export class CreateCompleteExamRequest {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateExamItemRequest)
  items!: CreateExamItemRequest[];
}
