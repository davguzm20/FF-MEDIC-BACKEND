import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePrescriptionItemRequest } from './create-prescription-item.request';

export class CreateCompletePrescriptionRequest {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePrescriptionItemRequest)
  items!: CreatePrescriptionItemRequest[];
}
