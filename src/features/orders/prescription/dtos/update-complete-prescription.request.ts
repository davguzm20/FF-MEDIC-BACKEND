import {
  IsOptional,
  IsInt,
  IsArray,
  ArrayMinSize,
  ValidateNested,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UpdatePrescriptionItemRequest } from './update-prescription-item.request';

export class UpdateCompletePrescriptionRequest {
  @IsOptional()
  @IsInt()
  @Min(1)
  prescriptionId?: number;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => UpdatePrescriptionItemRequest)
  items!: UpdatePrescriptionItemRequest[];
}
