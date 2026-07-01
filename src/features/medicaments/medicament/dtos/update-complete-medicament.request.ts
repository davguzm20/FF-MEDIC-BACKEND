import { IsOptional, IsArray, IsInt, Min } from 'class-validator';
import { UpdateMedicamentRequest } from './update-medicament.request';

export class UpdateCompleteMedicamentRequest extends UpdateMedicamentRequest {
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Min(1, { each: true })
  activeIngredientIds?: number[];
}
