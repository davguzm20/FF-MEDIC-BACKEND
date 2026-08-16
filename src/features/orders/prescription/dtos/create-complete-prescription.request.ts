import { IsArray, ArrayMinSize, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePrescriptionItemRequest } from './create-prescription-item.request';

export class CreateCompletePrescriptionRequest {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreatePrescriptionItemRequest)
  items!: CreatePrescriptionItemRequest[];
}
