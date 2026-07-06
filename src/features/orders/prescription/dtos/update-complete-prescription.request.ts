import {
  IsOptional,
  IsInt,
  IsArray,
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
  @ValidateNested({ each: true })
  @Type(() => UpdatePrescriptionItemRequest)
  items!: UpdatePrescriptionItemRequest[];
}
